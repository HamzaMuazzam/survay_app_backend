const router = require("express").Router();


router.route("/create")
    .post(
        require('../../file_handling/file_handling').
        initFileUploader().none(),


    )





module.exports = router;
