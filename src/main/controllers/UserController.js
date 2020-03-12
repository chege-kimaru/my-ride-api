import AuthService from '../services/AuthService';
import Send from '../utils/Send';
import ReqValidator from '../utils/validator';
import UserService from "../services/UserService";

export default class AccountController {

    static async setUser(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                name: 'required',
                country: 'required',
                city: 'required',
                phone: 'required',
                id_number: 'required',
            });
            if (!valid) return;

            const data = {
                name: req.body.name,
                country: req.body.country,
                city: req.body.city,
                phone: req.body.phone,
                id_number: req.body.id_number,
            };

            Send.success(res, 201, await UserService.setUser(req.user.id, data));
        } catch (err) {
            Send.error(res, err);
        }
    };

    static async getAccountDetails(req, res) {
        try {
            Send.success(res, 200, await UserService.getUser(req.user.id));
        } catch (err) {
            Send.error(res, err);
        }
    }
}
