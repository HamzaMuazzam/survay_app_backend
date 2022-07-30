const question = require('../../models/question_models/questions_model');


exports.createQuestionType = async (req, res) => {

    try {
        let result = await question.questionTypeModel.create(req.body);

        if (result === null) return res.status(400).send({
            status: false,
            message: 'Operation failed'
        });


        res.send(result);

    } catch (e) {
        res.status(400).send(e.message);
    }
}

exports.getAllQuestionType = async (req, res) => {

    try {
        let result = await question.questionTypeModel.find().select("-__v");

        if (result === null) return res.status(400).send({
            status: false,
            message: 'Operation failed'
        });

        res.send(result);

    } catch (e) {
        res.status(400).send(e.message);
    }
}


exports.createQuestion = async (req, res) => {

    try {
        let result = await question.questionTypeModel.find().select("-__v");

        if (result === null) return res.status(400).send({
            status: false,
            message: 'Operation failed'
        });

        res.send(result);

    } catch (e) {
        res.status(400).send(e.message);
    }
}