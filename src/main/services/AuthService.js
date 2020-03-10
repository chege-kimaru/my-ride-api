import {sequelize, Account} from '../db/models';
import {Op} from 'sequelize';
import {
    ResourceNotFoundError,
    AuthenticationError,
    OperationNotAllowedError,
    AuthorizationError
} from '../utils/errors';
import bcrypt from 'bcrypt';
import Logger from '../utils/logger';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';
import moment from 'moment';

const logger = new Logger().logger();

export default class AuthService {
    static async createUserGoogle(data) {
        try {
            let password = Math.random().toString(36).slice(-8);
            password = await bcrypt.hash(password, +process.env.BCRYPT_SALT);

            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: data.token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            const account = await Account.findOne({where: {email: payload.email}});
            if (account && account.id) {
                //login
                let account_ = account.dataValues;
                const payload = {id: account.id};
                account_.jwt = await jwt.sign(payload, process.env.SECRET_OR_KEY);
                return account_;
            }

            return Account.create({
                email: payload.email
            });
        } catch (err) {
            throw(err);
        }
    }
}
