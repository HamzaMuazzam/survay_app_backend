exports.errorParser = (res,message,errorCode,errorStatus)=>{
    res.status(errorCode??200).send({
        error:errorStatus??true,
        errorCode:errorCode??200,
        message:message??"Invalid body parameter(s)"
    });
}