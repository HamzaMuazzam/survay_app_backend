const SurveyType = require("../../models/suvery_models/survey_type_model");
const Survey = require("../../models/suvery_models/survey_model");
const color = require("colors");
const mongoose = require("mongoose");

//TODO: SURVEY CRUD ONLY

exports.createSurvey = async (req, res) => {
    try {
        let result = await Survey.create({
            surveyTitle: req.body.surveyTitle,
            surveyDescription:req.body.surveyDescription,
            surveyImage: !req.file? " " : req.file.path,
            surveyType: mongoose.Types.ObjectId(`${req.body.surveyTypeId}`),
            userID: mongoose.Types.ObjectId(`${req.body.id}`),
        });

        res.send(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e)
    }

}

exports.getAllSurveyByUserID = async (req, res) => {
    try {
        let result = await Survey.find().populate('surveyType',["surveyTypeName","_id"])

        res.send(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }

}






//TODO: SURVEY TYPES ONLY

exports.addSurveyType = async (req, res) => {
    try {

        let result = await SurveyType.create({
            surveyTypeName: req.body.surveyTypeName
        });


        if (result === null) res.status(400).send({message: "Unable to create survey type"});

        res.send(result);

    } catch (e) {
        res.status(400).send({
            message: e.message
        })
    }
}

exports.getAllSurveyType = async (req, res) => {
    try {

        let result = await SurveyType.find().select(['-__v']);

        console.log(`"${result}"`.bgGreen)
        if (result === null) res.status(200).send({message: "No Data Found"});

        res.send(result);

    } catch (e) {
        res.status(400).send({
            message: e.message
        })
    }
}

exports.getSingleSurveyType = async (req, res) => {
    try {
        if (!req.body.surveyTypeID) res.status(400).send({message: "Survey Type ID is required"});

        let result = await SurveyType.findById({_id: req.body.surveyTypeID});

        console.log(`"${result}"`.bgGreen)
        if (result === null) res.status(200).send({message: "No Data Found"});

        res.send({
            message: "Successful",
            result
        });

    } catch (e) {
        res.status(400).send({
            message: e.message
        })
    }
}

exports.deleteSingleSurveyType = async (req, res) => {
    try {
        if (!req.body.surveyTypeID) res.status(400).send({message: "Survey Type ID is required"});

        let result = await SurveyType.deleteOne({_id: req.body.surveyTypeID});

        console.log(`"${result}"`.bgGreen)
        if (result === null) res.status(200).send({message: "No Data Found"});

        res.send({
            message: result.deleteCount === 1 ? "Delete Successful" : "No data exists to delete",
            result
        });

    } catch (e) {
        res.status(400).send({
            message: e.message
        })
    }
}

exports.deleteAllSurveyType = async (req, res) => {
    try {

        res.send(await SurveyType.deleteMany());

    } catch (e) {
        res.status(400).send({
            message: e.message
        })
    }
}