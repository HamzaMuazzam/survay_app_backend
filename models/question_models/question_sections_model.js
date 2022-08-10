const mongoose = require('mongoose');
let schema = new mongoose.Schema({
        sectionTitle: {
            type: String,
            required: true,
        },
    },  {
        timestamps: true
    }
);

module.exports =  model = mongoose.model('QuestionSections',schema);
