
const  error=require('../error_handlers/response_error_handlers')
exports.validateUserFormData =async (req,res,next)=>{



    if(!req.body) return  error.errorParser(res,null,400,true);
    else if(!req.body.name) return  error.errorParser(res,"Name is required",400,true);
    // else if(!req.body.username) return  error.errorParser(res,"Username is required",400,true)
    else if(!req.body.password) return  error.errorParser(res,"Password is required",400,true)
    else if(!req.body.login_id) return  error.errorParser(res,"login id is required",400,true)
    else if(!req.body.isSocialLogin) return  error.errorParser(res,"socialLogin is required",400,true)
    next();
    // res.send({});
}

exports.validateUserLoginFormData = async (req,res,next)=>{

    console.log(req.body)

    if(!req.body) return  error.errorParser(res,null,400,true);
    else if(!req.body.login_id) return  error.errorParser(res,"login id is required",400,true)
    else if(!req.body.isSocialLogin){
        return  error.errorParser(res,"isSocialLogin is required => please pass true or false",400,true)
    }
    else if(req.body.isSocialLogin==='false' && !req.body.password) {
         return  error.errorParser(res,"Password is required",400,true)
    }


    next();

}

exports.validateForgotFormData = async (req,res,next)=>{

    console.log(req.body)

    if(!req.body) return  error.errorParser(res,null,400,true);
    else if(!req.body.login_id) return  error.errorParser(res,"login id is required",400,true)
    next();

}

exports.validateResetFormData = async (req,res,next)=>{

    console.log(req.body)

    if(!req.body) return  error.errorParser(res,null,400,true);
    else if(!req.body.login_id) return  error.errorParser(res,"login id is required",400,true)
    else if(!req.body.newPassword) return  error.errorParser(res,"New Password is required",400,true);
    next();

}

exports.validateUpdateFormData = async (req,res,next)=>{

    console.log(req.body)

    if(!req.body) return error.errorParser(res,null,400,true);
    else if(!req.body.login_id) return  error.errorParser(res,"login id is required",400,true)
    else if(!req.body.oldPassword) return  error.errorParser(res,"Old Password is required",400,true);
    else if(!req.body.newPassword) return  error.errorParser(res,"New Password is required",400,true);
    else if(!req.body.newConfirmedPassword) return  error.errorParser(res,"New Confirm Password is required",400,true);
    else if(req.body.newConfirmedPassword!==req.body.newPassword) return  error.errorParser(res,"Passwords does not match",400,true);
    next();

}

