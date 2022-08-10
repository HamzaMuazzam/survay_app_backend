const mongoose = require("mongoose");
const color = require("colors");
const SurveyType = require("../../models/suvery_models/survey_type_model");
const Survey = require("../../models/suvery_models/survey_model");
const QuestionSectionModel = require("../../models/question_models/question_section");
const QuestionModel = require("../../models/question_models/questions_model");
const fs =require("fs");
//TODO: SURVEY CRUD ONLY

exports.createSurvey = async (req, res) => {
    try {





        // await Survey.deleteMany();
        // await QuestionSectionModel.QuestionSectionModel.deleteMany();
        // await QuestionModel.questionModel.deleteMany();

        req.files.forEach((item,index,array)=>{
                if(item.fieldname==="surveyImage"){req.body.surveyImage=item.path;}
        })




        let result = await Survey.create({
            surveyTitle: req.body.surveyTitle,
            surveyDescription: req.body.surveyDescription,
            surveyType: mongoose.Types.ObjectId(`${req.body.surveyTypeId}`),
            userID: mongoose.Types.ObjectId(`${req.body.id}`),
            surveyImage: req.body.surveyImage

        });


        if (result !== null) {
            let surveyId = result._id;


            for (let i = 0; i < req.body.sections.length; i++) {
                req.body.sections[i].userId = req.body.id;
                req.body.sections[i].surveyId = surveyId;

                var resultsOfQuestionSection = await QuestionSectionModel.QuestionSectionModel.create(req.body.sections[i]);

                var updateMany = await Survey.updateOne({_id: surveyId}, {$set: {questionSectionId: resultsOfQuestionSection._id}});

                if (req.body.sections[i].questions) {
                    for (let j = 0; j < req.body.sections[i].questions.length; j++) {
                        req.body.sections[i].questions[j].createdBy = req.body.id;
                        req.body.sections[i].questions[j].questionSectionId = resultsOfQuestionSection._id;

                        // const fruits = ["Banana", "Orange", "Apple", "Mango"];
                        // console.log(fruits.includes("Mango"));
                        // console.log(req.files.includes(`sections[${i}][questions][${j}][questionImage]`));
                        // console.log(`sections[${i}][questions][${j}][questionImage]`);
                        if (req.files/* && req.files.iterator.includes(`sections[${i}][questions][${j}][questionImage]`)*/) {
                            console.log(req.files);

                            req.files.forEach((value, index, array) => {
                                if (value.fieldname === `sections[${i}][questions][${j}][questionImage]`) {
                                    req.body.sections[i].questions[j].questionImagePath = value.path;
                                }
                            })


                            // req.body.sections[i].questions[j].questionImagePath = req.files.includes(`sections[${i}][questions][${j}][questionImage]`).fieldname;

                        }

                        let createdQuestion = await QuestionModel.questionModel.create(req.body.sections[i].questions[j]);
                        if (createdQuestion) {
                            let newVar = await QuestionSectionModel.QuestionSectionModel.updateOne({_id: resultsOfQuestionSection._id}, {$set: {questionIds: createdQuestion._id}});
                        }

                    }
                }

            }

            res.send({
                body: req.body
            });

        }


    }
    catch (e) {


        if(req.files){
            req.files.forEach((item,index,array)=>{

            fs.unlinkSync(item.path);

            })

        }
        console.log(e.message);
        res.status(400).send({message: e.message})
    }

}

exports.getAllSurveyByUserID = async (req, res) => {
    try {


        let result = await Survey.aggregate([
            {
                $lookup: {
                    from: "surveytypes",
                    localField: "surveyType",
                    foreignField: "_id",
                    as: "surveyType"
                },
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "user"
                },
                $lookup: {
                    from: "questionsections",
                    localField: "questionSectionId",
                    foreignField: "_id",
                    as: "sections",
                    pipeline:[
                        // { "$match": { "$expr": { "$eq": ["$questionSectionId", "$_id"] }}},
                        {
                            $lookup:{
                                from: "questions",
                                localField:"questionIds",
                                foreignField:"_id",
                                as:"Questions"

                            },

                        },
                        {$unwind:"$questionIds"}
                    ],
                },
            }

        ])


        res.send(result);
    } catch (e) {
        console.log(e);
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