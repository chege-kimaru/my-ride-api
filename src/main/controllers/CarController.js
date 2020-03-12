import CarService from '../services/CarService';
import Send from '../utils/Send';
import ReqValidator from '../utils/validator';
import CarMakeService from "../services/CarMakeService";

export default class CarController {
    static async createCar(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                price: 'required'
            });
            if (!valid) return;

            const data = {
                price: req.body.price,
                terms: req.body.terms,
                user_id: req.user.id
            };

            Send.success(res, 201, await CarService.createCar(data));
        } catch (err) {
            Send.error(res, err);
        }
    };

    static async updateCar(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                price: 'required'
            });
            if (!valid) return;

            const data = {
                price: req.body.price,
                terms: req.body.terms
            };
            Send.success(res, 200, await CarService.updateCar(req.car, data));
        } catch (err) {
            Send.error(res, err);
        }
    };

    static async setCarDetails(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                make_id: 'required',
                model_id: 'required',
                mileage: 'required',
                body_type: 'required',
                condition_type: 'required',
                transmission_type: 'required',
            });
            if (!valid) return;

            const data = {
                make_id: +req.body.make_id,
                model_id: +req.body.model_id,
                series_id: req.body.series_id ? +req.body.series_id : null,
                year: req.body.year,
                mileage: req.body.mileage,
                body_type: req.body.body_type,
                condition_type: req.body.condition_type,
                transmission_type: req.body.transmission_type,
            };

            Send.success(res, 200, await CarService.setCarDetails(req.car, data));
        } catch (err) {
            Send.error(res, err);
        }
    };

    static async setCarFeature(req, res) {
        try {
            const valid = await ReqValidator.validate(req, res, {
                fuel_type: 'required',
                interior_type: 'required',
                colour: 'required',
                engine: 'required'
            });
            if (!valid) return;

            const data = {
                fuel_type: req.body.fuel_type,
                interior_type: req.body.interior_type,
                colour: req.body.colour,
                engine: req.body.engine,
                description: req.body.description,
            };

            Send.success(res, 201, await CarService.setCarFeature(req.car, data));
        } catch (err) {
            Send.error(res, err);
        }
    };


    static async getCars(req, res) {
        try {
            Send.success(res, 200, await CarService.getCars());
        } catch (err) {
            Send.error(res, err);
        }
    }

    static async getCarDetails(req, res) {
        try {
            Send.success(res, 200, await CarService.getCarDetails(req.car.id));
        } catch (err) {
            Send.error(res, err);
        }
    }

    static async setCarPicture(req, res) {
        try {
            req.body.picture = req.file && req.file.secure_url;
            const valid = await ReqValidator.validate(req, res, {
                part: 'required',
                picture: 'required'
            });
            if (!valid) return;

            const data = {
                part: req.body.part,
                picture: req.body.picture
            };

            Send.success(res, 200, await CarService.setCarPicture(req.car, data));
        } catch (err) {
            Send.error(res, err);
        }
    };
}
