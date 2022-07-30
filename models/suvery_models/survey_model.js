const mongoose = require('mongoose');
let surveySchema = new mongoose.Schema({
        surveyTitle: {
            type: String,
            required: true,
        },
        surveyDescription: {
            type: String,
            required: true
        },
        surveyImage: {
            type: String,
            required: true
        },
        surveyType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SurveyType',
            required: true,
        },

        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        questionSection: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'QuestionSections',
            required: true,
        },

    },
    {
        timestamps: true
    }
);


module.exports = Survey = mongoose.model("Surveys", surveySchema);
