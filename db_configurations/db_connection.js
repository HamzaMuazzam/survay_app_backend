const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(
    process.env.CONNECTION_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    function (error) {
        if (error) console.error(error);
        else console.log("mongoDB connected successfully");
    }
);

