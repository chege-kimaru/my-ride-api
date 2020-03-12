import Send from '../utils/Send';
import {AuthorizationError, ForbiddenError, ResourceNotFoundError} from '../utils/errors';
import CarService from "../services/CarService";

export default async function Car(req, res, next) {
    try {
        const car = await CarService.findByPk(req.params.carId);
        if (car && car.id) {
            req.car = car;
            return next();
        } else {
            return Send.error(res, new ResourceNotFoundError('This car does not exist'));
        }
    } catch (error) {
        return Send.error(res, error);
    }
}
