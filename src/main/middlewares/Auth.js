import jwt from 'jsonwebtoken';
import Send from '../utils/Send';
import {AuthorizationError, ForbiddenError} from '../utils/errors';
import AuthService from '../services/AuthService';

export default function Auth(req, res, next) {
    const {token} = req.headers;
    jwt.verify(token, process.env.SECRET_OR_KEY, async (err, decoded) => {
        if (err) return Send.error(res, new AuthorizationError('Auth: You are not authorized'));
        try {
            const u = await AuthService.findByPk(decoded.id);
            if (!u.verified) return Send.error(res, new ForbiddenError('Please verify this account.'));
            req.user = u;
            return next();
        } catch (error) {
            return Send.error(res, error);
        }
    });
}
