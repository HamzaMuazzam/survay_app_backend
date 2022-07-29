// const encrypt = require("../../utils/pass_encrypt");
const color = require("colors");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
// const dPass = await encrypt.comparePassword("HAMZA MUAZZAM",ePass);
// console.log(dPass)
const userModel = require('../../models/user_models/user_model')


exports.createUser = async (req, res, next) => {

    let filePath;
    if (req.file) {
        filePath = req.file.path;
        req.body.profileImage = filePath ?? "";
        console.log(req.profileImage);
    }

    try {
        console.log(req.body);

        let userModel1 = new userModel(req.body);
        let newVar = await userModel1.save();

        res.send({
            error: false,
            errorCode: null,
            message: "User created",
            result: newVar
        });

    } catch (err) {
        console.log(err)
        res.status(403).send({
            message: err.message
        })
    }
}


exports.loginUser = async (req, res, next) => {


    try {

        let user = [];
        if (req.body.isSocialLogin === 'true') {
            console.log("isSocialLogin".bgRed)
            user = await userModel.findOne({
                login_id: req.body.login_id,
                isSocialLogin: true
            });
            console.log(user);

        } else if (req.body.isSocialLogin === 'false') {
            console.log("isSocialLogin".bgGreen)
            user = await userModel.findOne({
                login_id: req.body.login_id,
                isSocialLogin: false,
                password: req.body.password
            });
            console.log(user);

        } else {
            res.status(403).send({
                message: "Please check your login details."
            })
            return;
        }


        if (user === null) return res.status(403).send({message: "Please check your login details."})
        res.send({
            message: "Logged in",
            user: user
        });
    } catch (err) {

        res.status(403).send({
            message: err.message
        })
    }
}


exports.forgotPassword = async (req, res, next) => {


    try {


        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });

        // create reusable transporter object using the default SMTP transport


        let transporter = nodemailer.createTransport({
            host: "server234.web-hosting.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            // secure: false,
            requireTLS: true,
            auth: {
                user: "test@programmerforce.com", // generated ethereal user
                pass: "j;.0&t[?0Ddm", // generated ethereal password
            },
            from: 'test@programmerforce.com'
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'Question me test@programmerforce.com', // sender address
            to: req.body.login_id, // recipient address, // list of receivers
            subject: "Reset Password OTP ✔", // Subject line
            text: "Reset Password OTP ✔", // plain text body
            html:
                `<html>
    <body>
    
    <h2>Reset Password OTP ✔</h2>
    <dl>
      <dt>One Time Password ✔</dt>
      <dd>- ${otp}</dd>
      
    </dl>
    
    </body>
    </html>`
        });

        res.send({
            message: 'Otp has been sent to your email please check your inbox or spam',
            // validTill:new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 ),
            otp: otp

        })

    } catch (err) {
        console.log(err)
        res.status(403).send({
            message: err.message
        })
    }
}


exports.resetPassword = async (req, res, next) => {


    try {

        let updatedData = await userModel.updateOne({ login_id: req.body.login_id }, { $set: { password:req.body.newPassword } });
        res.status(updatedData.modifiedCount === 1? 200 : 400 ).send({
            success: updatedData.modifiedCount === 1,
            message:updatedData.modifiedCount === 1 ? "Password updated successfully" : "Password update failed",
            result: updatedData

        })

    } catch (err) {
        console.log(err)
        res.status(403).send({
            message: err.message
        })
    }
}

exports.updatePassword = async (req, res, next) => {


    try {

        let updatedData = await userModel.updateOne(

            { login_id: req.body.login_id , password: req.body.oldPassword},
            { $set: { password:req.body.newPassword } }

        );
        res.status(updatedData.modifiedCount === 1? 200 : 400 ).send({
            success: updatedData.modifiedCount === 1,
            message:updatedData.modifiedCount === 1 ? "Password updated successfully" : "Password update failed",
            result: updatedData
        })

    } catch (err) {
        console.log(err)
        res.status(403).send({
            message: err.message
        })
    }
}


