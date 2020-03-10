import {Validator} from 'node-input-validator';

class ReqValidator {
  static async validate(req, res, rules) {
    const v = new Validator(req.body, rules);
    const matched = await v.check();
    if (!matched) {
      const errors = [];
      for (const key of Object.keys(v.errors)) {
        errors.push(v.errors[key] && v.errors[key].message);
      }
      res.status(400).json({error: errors, status: 'error'});
      return false;
    }
    return true;
  }
}

export default ReqValidator;
