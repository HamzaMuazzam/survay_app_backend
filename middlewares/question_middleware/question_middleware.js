const error = require("../error_handlers/response_error_handlers");

exports.verifyQuestionType = (req, res, next) => {



    if (!req.body) return error.errorParser(res, "bad request", 400, true);
    else if (!req.body.questionTypeName) return error.errorParser(res, "questionTypeName is required", 400, true);
    next();
}



exports.verifyQuestionData = (req, res, next) => {
    if (!req.body) return error.errorParser(res, "bad request", 400, true);
    else if (!req.body.questionTypeName) return error.errorParser(res, "questionTypeName is required", 400, true);
    next();
}