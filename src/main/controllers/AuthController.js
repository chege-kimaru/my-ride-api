import AuthService from '../services/AuthService';
import Send from '../utils/Send';
import ReqValidator from '../utils/validator';

export default class AccountController {

    static async googleSignIn(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                token: 'required'
            });
            if (!valid) return;

            const data = {
                token: req.body.token
            };

            Send.success(res, 201, await AuthService.createUserGoogle(data));
        } catch (err) {
            Send.error(res, err);
        }
    };

    static async getAccountDetails(req, res) {
        try {
            Send.success(res, 200, req.user);
        } catch (err) {
            Send.error(res, err);
        }
    }
}
