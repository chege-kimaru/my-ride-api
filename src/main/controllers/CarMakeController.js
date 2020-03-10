import CarMakeService from '../services/CarMakeService';
import Send from '../utils/Send';
import ReqValidator from '../utils/validator';

export default class CarController {

    static async createMake(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                make: 'required'
            });
            if (!valid) return;

            const data = {
                make: req.body.make
            };

            Send.success(res, 201, await CarMakeService.createMake(data));
        } catch (err) {
            Send.error(res, err);
        }
    };

    static async getMakes(req, res) {
        try {
            Send.success(res, 200, await CarMakeService.getMakes());
        } catch (err) {
            Send.error(res, err);
        }
    }

    static async createModel(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                model: 'required'
            });
            if (!valid) return;

            const data = {
                model: req.body.model,
                make_id: req.params.makeId
            };

            Send.success(res, 201, await CarMakeService.createModel(data));
        } catch (err) {
            Send.error(res, err);
        }
    };

    static async getModels(req, res) {
        try {
            Send.success(res, 200, await CarMakeService.getModels(req.params.makeId));
        } catch (err) {
            Send.error(res, err);
        }
    }

    static async createSeries(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                series: 'required'
            });
            if (!valid) return;

            const data = {
                series: req.body.series,
                model_id: req.params.modelId
            };

            Send.success(res, 201, await CarMakeService.createSeries(data));
        } catch (err) {
            Send.error(res, err);
        }
    };

    static async getSeries(req, res) {
        try {
            Send.success(res, 200, await CarMakeService.getSeries(req.params.modelId));
        } catch (err) {
            Send.error(res, err);
        }
    }
}
