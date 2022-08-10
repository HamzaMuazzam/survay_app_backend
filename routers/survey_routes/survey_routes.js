const router = require("express").Router();
const authMiddleware = require('../../middlewares/auth_middleware/auth_middleware');
const surveyController = require('../../controllers/survey_controller/survey_controller')
router.route("/create")
    .post(
        // require('../../file_handling/file_handling').initFileUploader().ma("surveyImage"),
        require('../../file_handling/file_handling').initFileUploader().any(),
        authMiddleware.verifyUserByUserID,
        surveyController.createSurvey
    )

router.route("/getAllSurveyByUserID")
    .post(
        require('../../file_handling/file_handling').initFileUploader().single("surveyImage"),
        authMiddleware.verifyUserByUserID,
        surveyController.getAllSurveyByUserID
    )

router.route("/addSurveyType")
    .post(
        require('../../file_handling/file_handling').initFileUploader().none(),
        authMiddleware.verifyUserByUserID,
        surveyController.addSurveyType
    )

router.route("/getAllSurveryTypes")
    .post(
        require('../../file_handling/file_handling').initFileUploader().none(),
        authMiddleware.verifyUserByUserID,
        surveyController.getAllSurveyType
    )

router.route("/getSingleSurveyType")
    .post(
        require('../../file_handling/file_handling').initFileUploader().none(),
        authMiddleware.verifyUserByUserID,
        surveyController.getSingleSurveyType
    )

router.route("/deleteSingleSurveyType")
    .delete(
        require('../../file_handling/file_handling').initFileUploader().none(),
        authMiddleware.verifyUserByUserID,
        surveyController.deleteSingleSurveyType
    )

router.route("/deleteAllSurveyType")
    .delete(
        require('../../file_handling/file_handling').initFileUploader().none(),
        authMiddleware.verifyUserByUserID,
        surveyController.deleteAllSurveyType
    )







module.exports = router;
