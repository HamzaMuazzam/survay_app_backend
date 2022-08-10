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
        surveyCreationRegion: {
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

        questionSectionId: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'QuestionSections'
        },

    },
    {
        timestamps: true
    }
);


module.exports = Survey = mongoose.model("Surveys", surveySchema);
