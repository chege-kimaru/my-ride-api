import {
    sequelize,
    User,
    Car,
    Hire,
    CarDetail,
    Make,
    Model,
    Series,
    CarFeature,
    CarPicture,
    Payment
} from '../db/models';
import {Op} from 'sequelize';
import {
    ResourceNotFoundError,
    AuthenticationError,
    OperationNotAllowedError,
    AuthorizationError,
    ForbiddenError
} from '../utils/errors';
import Logger from '../utils/Logger';
import cloudinary from 'cloudinary';
import Sms from "../utils/sms";
import axios from 'axios';

const logger = new Logger().logger();

export default class HireService {

    static async findByPk(hireId) {
        return Hire.findByPk(hireId, {
            include: [{model: Car}, {model: User}]
        })
    }

    static async hire(car, data) {
        return Hire.create(data).then(async hire => {
            const user = await car.getUser();
            const message = `Hello ${user.name}. Someone just applied to hire your car. Please verify the hiring.`;
            const sms = new Sms();
            await sms.send({message, to: user.phone});
            return hire;
        })
    }

    static async getCarHires(car, active = false) {
        if (active)
            return car.getHires({
                where: {
                    status: {
                        [Op.or]: [1, 2, 4]
                    }
                },
                include: {
                    model: Car,
                        include: {
                        model: CarDetail,
                        include: [{model: Make}, {model: Model}, {model: Series}],
                        required: false
                    },
                }
            });
        return car.getHires();
    }

    static async getUserHires(user) {
        return user.User.getHires({
            include: {
                model: Car,
                include: [
                    {
                        model: CarDetail,
                        include: [{model: Make}, {model: Model}, {model: Series}],
                        required: false
                    },
                    {model: CarFeature, required: false},
                    {model: CarPicture, required: false},
                ]
            }
        })
    }

    static async verifyHire(hire, user) {
        if (hire.status !== 1) {
            throw new OperationNotAllowedError('You can only verify a booked hire');
        }
        if (hire.Car.user_id !== user.id) {
            throw new AuthorizationError('You are not authorised to verify this hire');
        }
        return hire.update({status: 2}).then(async (h) => {
            const message = `Hello ${hire.User.name}. Your hire has been verified. Please proceed to pay.`;
            const sms = new Sms();
            await sms.send({message, to: hire.User.phone});
            return h;
        });
    }

    static async cancelHire(hire, user) {
        const statusVerification = +hire.status === 1 || +hire.status === 2;
        if (!statusVerification) {
            throw new OperationNotAllowedError('You can only cancel a booked hire');
        }
        const userVerification = hire.Car.user_id === user.id || hire.user_id === user.id;
        if (!userVerification) {
            throw new AuthorizationError('You are not authorized to cancel this hire');
        }
        return hire.update({status: 3}).then(async (h) => {
            const sms = new Sms();
            const message1 = `Hello ${hire.User.name}. Hire #${hire.id} has been cancelled.`;
            const message2 = `Hello ${user.User.name}. Hire #${hire.id} has been cancelled.`;
            await sms.send({message: message1, to: hire.User.phone});
            await sms.send({message: message2, to: user.User.phone});
            return h;
        });
    }

    static async payForHire(hire, user, {txref}) {
        if (hire.status !== 2) {
            throw new OperationNotAllowedError('You can only pay for a verified hire');
        }
        if (hire.user_id !== user.id) {
            throw new AuthorizationError('You are not authorised to pay for this hire');
        }

        const body = {
            SECKEY: process.env.RAVE_SECKEY,
            txref
        };
        try {
            const response = await axios.post(process.env.RAVE_VERIFY_URL, body);
            const responseData = response && response.data && response.data.data;
            const valid = responseData && responseData.status === 'successful' && responseData.chargecode === '00';
            if (!valid) throw new OperationNotAllowedError('This payment does not exist');

            const amount = ((20 / 100) * hire.Car.price) + hire.Car.price;
            if (+responseData.amount !== amount)
                throw new OperationNotAllowedError('This payment is invalid');

            return sequelize.transaction(transaction => {
                return Payment.create({
                    txref: responseData.txref,
                    amount: responseData.amount
                }, {transaction}).then(payment => {
                    return hire.update({
                        status: 4,
                        payment_id: payment.id
                    }, {transaction}).then(async (h) => {
                        const message = `Hello ${hire.User.name}. Hire has been paid for.`;
                        const sms = new Sms();
                        await sms.send({message, to: hire.User.phone});
                        return h;
                    });
                })
            });
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    static async markReturned(hire, user) {
        if (hire.status !== 4) {
            throw new OperationNotAllowedError('You can only return a paid for hire');
        }
        if (hire.Car.user_id !== user.id) {
            throw new AuthorizationError('You are not authorized to mark this hire as returned');
        }
        return hire.update({status: 5});
    }

}
