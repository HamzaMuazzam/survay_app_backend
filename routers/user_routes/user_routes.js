const router = require("express").Router();

const userController = require("../../controllers/user_controller/user_controller");
const userMiddleware = require('../../middlewares/auth_middleware/login_middleware');


router.route("/create")
    .post(
        require('../../file_handling/file_handling').
        initFileUploader()
            .single("profileImage"),
        userMiddleware.validateUserFormData,
        userController.createUser,

    )


router.route("/login")
    .post(
        require('../../file_handling/file_handling').
        initFileUploader().none(),
        userMiddleware.validateUserLoginFormData,
        userController.loginUser,

    )

router.route("/forgotPassword")
    .post(
        require('../../file_handling/file_handling').
        initFileUploader().none(),
        userMiddleware.validateForgotFormData,
        userController.forgotPassword,

    )



router.route("/resetPassword")
    .post(
        require('../../file_handling/file_handling').
        initFileUploader().none(),
        userMiddleware.validateResetFormData,
        userController.resetPassword,

    )

router.route("/updatePassword")
    .post(
        require('../../file_handling/file_handling').
        initFileUploader().none(),
        userMiddleware.validateUpdateFormData,
        userController.updatePassword,

    )



module.exports = router;
