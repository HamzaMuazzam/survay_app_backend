const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    questionSectionTitle: {
        type: String,
        required: true
    },
    surveyId: {
        type: String,
        required: true
    },
    questionIds:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Question'
    }

},
    {timestamps:true});

exports.QuestionSectionModel = mongoose.model("QuestionSection",schema);