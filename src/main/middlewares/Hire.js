import Send from '../utils/Send';
import {AuthorizationError, ForbiddenError, ResourceNotFoundError} from '../utils/errors';
import HireService from "../services/HireService";

export default async function Car(req, res, next) {
    try {
        const hire = await HireService.findByPk(req.params.hireId);
        if (hire && hire.id) {
            req.hire = hire;
            return next();
        } else {
            return Send.error(res, new ResourceNotFoundError('This hire does not exist'));
        }
    } catch (error) {
        return Send.error(res, error);
    }
}
