
exports.validateUserFormData =async (req,res,next)=>{



    if(!req.body) return errorParser(res,null,400,true);
    else if(!req.body.name) return errorParser(res,"Name is required",400,true);
    // else if(!req.body.username) return errorParser(res,"Username is required",400,true)
    else if(!req.body.password) return errorParser(res,"Password is required",400,true)
    else if(!req.body.login_id) return errorParser(res,"login id is required",400,true)
    else if(!req.body.isSocialLogin) return errorParser(res,"socialLogin is required",400,true)
    next();
    // res.send({});
}

exports.validateUserLoginFormData =async (req,res,next)=>{

    console.log(req.body)

    if(!req.body) return errorParser(res,null,400,true);
    else if(!req.body.login_id) return errorParser(res,"login id is required",400,true)
    else if(!req.body.isSocialLogin){
        return errorParser(res,"isSocialLogin is required => please pass true or false",400,true)
    }
    else if(req.body.isSocialLogin==='false' && !req.body.password) {
         return errorParser(res,"Password is required",400,true)
    }


    next();

}

exports.validateForgotFormData =async (req,res,next)=>{

    console.log(req.body)

    if(!req.body) return errorParser(res,null,400,true);
    else if(!req.body.login_id) return errorParser(res,"login id is required",400,true)
    next();

}

exports.validateResetFormData =async (req,res,next)=>{

    console.log(req.body)

    if(!req.body) return errorParser(res,null,400,true);
    else if(!req.body.login_id) return errorParser(res,"login id is required",400,true)
    else if(!req.body.newPassword) return errorParser(res,"New Password is required",400,true);
    next();

}

exports.validateUpdateFormData =async (req,res,next)=>{

    console.log(req.body)

    if(!req.body) return errorParser(res,null,400,true);
    else if(!req.body.login_id) return errorParser(res,"login id is required",400,true)
    else if(!req.body.oldPassword) return errorParser(res,"Old Password is required",400,true);
    else if(!req.body.newPassword) return errorParser(res,"New Password is required",400,true);
    else if(!req.body.newConfirmedPassword) return errorParser(res,"New Confirm Password is required",400,true);
    else if(req.body.newConfirmedPassword!==req.body.newPassword) return errorParser(res,"Passwords does not match",400,true);
    next();

}

errorParser = (res,message,errorCode,errorStatus)=>{
    res.status(errorCode??200).send({
        error:errorStatus??true,
        errorCode:errorCode??200,
        message:message??"Invalid body parameter(s)"
    });
}