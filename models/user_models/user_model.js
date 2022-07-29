const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

        name: String,
        userName: String,
        login_id: {type: String, unique: true, required: true},
        isSocialLogin: {type: Boolean, default: false,required: true},
        password: {type: String, minlength: 6},
        profileImage: String,
        socialType: String,
    },
    {
        timestamps: true
    }
);


module.exports = userModel = mongoose.model("User", userSchema);
