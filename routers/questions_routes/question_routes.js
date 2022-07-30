const router = require('express').Router();
const auth = require('../../middlewares/auth_middleware/auth_middleware');
const questionMiddleware = require('../../middlewares/question_middleware/question_middleware');
const questionController = require('../../controllers/question_controller/question_controller')
router.route("/createQuestionType")
    .post(
        require('../../file_handling/file_handling').initFileUploader().none(),
        auth.verifyUserByUserID,
        questionMiddleware.verifyQuestionType,
        questionController.createQuestionType

    );

router.route("/getAllQuestionType")
    .get(questionController.getAllQuestionType);

router.route("/createQuestion")
    .post(
        require('../../file_handling/file_handling').initFileUploader().any(),
        auth.verifyUserByUserID,
        questionMiddleware.verifyQuestionData,
        questionController.createQuestion

    );

module.exports = router;