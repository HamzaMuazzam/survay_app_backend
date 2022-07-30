const mongoose = require("mongoose");

schema = new mongoose.Schema({
    surveyTypeName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
module.exports = SurveyTypeSchema = mongoose.model("SurveyType", schema);