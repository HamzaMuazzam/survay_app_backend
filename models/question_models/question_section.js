const mongoose = require('mongoose');

let QuestionSectionModel = mongoose.model("QuestionSection", {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },


    }
);