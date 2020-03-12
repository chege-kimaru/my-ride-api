import {sequelize, Make, Model, Series, Car, CarDetail, CarFeature, CarPicture} from '../db/models';
import {Op} from 'sequelize';
import {
    ResourceNotFoundError,
    AuthenticationError,
    OperationNotAllowedError,
    AuthorizationError
} from '../utils/errors';
import Logger from '../utils/Logger';
import cloudinary from 'cloudinary';

const logger = new Logger().logger();

export default class CarService {
    static async getCars() {
        return Car.findAll({
            include: [
                {
                    model: CarDetail,
                    required: true,
                    include: [{model: Make}, {model: Model}, {model: Series}]
                },
                {model: CarFeature, required: true},
                {model: CarPicture, required: false},
            ]
        });
    }

    static async getCarDetails(carId) {
        return Car.findByPk(carId, {
            include: [
                {
                    model: CarDetail,
                    include: [{model: Make}, {model: Model}, {model: Series}],
                    required: false
                },
                {model: CarFeature, required: false},
                {model: CarPicture, required: false},
            ]
        });
    }

    static async findByPk(carId) {
        return Car.findByPk(carId);
    }

    static async createCar(data) {
        return Car.create(data);
    }

    static async updateCar(car, data) {
        return car.update(data);
    }

    static async setCarDetails(car, data) {
        const carDetail = await car.getCarDetail();
        if (carDetail && carDetail.car_id) {
            return carDetail.update(data);
        } else {
            data.car_id = car.id;
            return CarDetail.create(data);
            // return car.setCarDetail(data);
        }
    }

    static async setCarFeature(car, data) {
        const carFeature = await car.getCarFeature();
        if (carFeature && carFeature.car_id) {
            return carFeature.update(data);
        } else {
            data.car_id = car.id;
            return CarFeature.create(data);
            // return car.setCarFeature(data);
        }
    }

    static async setCarPicture(car, data) {
        const carPicture = await CarPicture.findOne({where: {part: data.part, car_id: car.id}});
        if (carPicture && carPicture.picture) {
            //delete from cloudinary and update
            try {
                const pic = carPicture.picture;
                let imageId = pic.substr(pic.lastIndexOf('/') + 1,
                    pic.lastIndexOf('.') - pic.lastIndexOf('/') - 1);
                await cloudinary.v2.uploader.destroy(imageId);
            } catch (error) {
                logger.error(error);
            }
            return carPicture.update(data);
        } else {
            data.car_id = car.id;
            return CarPicture.create(data);
        }
    }

}
