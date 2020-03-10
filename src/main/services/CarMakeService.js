import {sequelize, Make, Model, Series} from '../db/models';
import {Op} from 'sequelize';
import {
    ResourceNotFoundError,
    AuthenticationError,
    OperationNotAllowedError,
    AuthorizationError
} from '../utils/errors';
import bcrypt from 'bcrypt';
import Logger from '../utils/Logger';

const logger = new Logger().logger();

export default class CarMakeService {
    static async createMake(data) {
        return Make.create(data);
    }

    static async getMakes() {
        return Make.findAll();
    }

    static async createModel(data) {
        return Model.create(data);
    }

    static async getModels(makeId) {
        return Model.findAll({where: {make_id: makeId}})
    }

    static async createSeries(data) {
        return Series.create(data);
    }

    static async getSeries(modelId) {
        return Series.findAll({where: {model_id: modelId}})
    }
}
