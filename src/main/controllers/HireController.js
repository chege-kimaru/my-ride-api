import CarService from '../services/CarService';
import Send from '../utils/Send';
import ReqValidator from '../utils/validator';
import HireService from "../services/HireService";

export default class HireController {
    static async hire(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                from: 'required',
                to: 'required',
                purpose: 'required',
                location: 'required',
            });
            if (!valid) return;

            const data = {
                from: req.body.from,
                to: req.body.to,
                purpose: req.body.purpose,
                location: req.body.location,
                user_id: req.user.id,
                car_id: req.car.id
            };

            Send.success(res, 201, await HireService.hire(req.car, data));
        } catch (err) {
            Send.error(res, err);
        }
    };

    static async getCarHires(req, res) {
        try {
            Send.success(res, 200, await HireService.getCarHires(req.car, req.query.active));
        } catch (err) {
            Send.error(res, err);
        }
    }

    static async getUserHires(req, res) {
        try {
            Send.success(res, 200, await HireService.getUserHires(req.user));
        } catch (err) {
            Send.error(res, err);
        }
    }

    static async verifyHire(req, res) {
        try {
            Send.success(res, 200, await HireService.verifyHire(req.hire, req.user));
        } catch (err) {
            Send.error(res, err);
        }
    }

    static async cancelHire(req, res) {
        try {
            Send.success(res, 200, await HireService.cancelHire(req.hire, req.user));
        } catch (err) {
            Send.error(res, err);
        }
    }

    static async payHire(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                txref: 'required',
            });
            if (!valid) return;

            Send.success(res, 200, await HireService.payForHire(req.hire, req.user, {txref: req.body.txref}));
        } catch (err) {
            Send.error(res, err);
        }
    }

    static async markReturned(req, res) {
        try {
            Send.success(res, 200, await HireService.markReturned(req.hire, req.user));
        } catch (err) {
            Send.error(res, err);
        }
    }
}
