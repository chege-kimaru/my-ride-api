import {sequelize, User, Account} from '../db/models';
import {Op} from 'sequelize';
import {
    ResourceNotFoundError,
    AuthenticationError,
    OperationNotAllowedError,
    AuthorizationError
} from '../utils/errors';
import Logger from '../utils/Logger';

const logger = new Logger().logger();

export default class UserService {
    static async getUser(userId) {
        return User.findByPk(userId, {include: Account});
    }

    static async setUser(accountId, data) {
        return User.findByPk(accountId).then(u => {
            if(u && u.account_id) {
                return u.update(data);
            } else {
                data.account_id = accountId;
                return User.create(data);
            }
        })
    }

}
