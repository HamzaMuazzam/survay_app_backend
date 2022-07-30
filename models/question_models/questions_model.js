const mongoose = require("mongoose");


exports.questionTypeModel = mongoose.model("QuestionType", {

    questionTypeName: {
        type: String,
        required: true
    },
})


exports.questionModel = mongoose.model("Question", {
    questionTitle: {
        type: String,
        required: true
    },
    questionType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "QuestionType"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    questionSectionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "QuestionSection"
    },
    questionImagePath: String,
    questionCheckBoxOptions: Array,
    questionDropDownOptions: Array,
    questionRatingOptions: Array

    // questionSingleInputOptions:String,
    // questionCommentInputOptions:String,


});