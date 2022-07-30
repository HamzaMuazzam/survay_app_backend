const User = require("../../models/user_models/user_model");
const error = require('../error_handlers/response_error_handlers')


exports.verifyUserByUserID = (req, res, next) => {

    if (!req.body) return error.errorParser(res, "fields are required", 400, true)
    else if (!req.body.id) return error.errorParser(res, "user id  required", 400, true)
    next();

}