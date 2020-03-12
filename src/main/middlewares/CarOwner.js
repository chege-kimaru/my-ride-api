import Send from '../utils/Send';
import {AuthorizationError, ForbiddenError, ResourceNotFoundError} from '../utils/errors';

export default async function CarOwner(req, res, next) {
    try {
        if (req.car.user_id !== req.user.id) {
            return Send.error(res, new ForbiddenError('You are not allowed to edit this car'));
        }
        return next();
    } catch (error) {
        return Send.error(res, error);
    }
}
