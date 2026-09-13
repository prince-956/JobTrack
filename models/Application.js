const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema(
    {
        user : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
        company : {type : String, required : true, trim : true},
        role : {type : String, required : true, trim : true},
        status : {
            type : String,
            enum : ['Saved', 'Applied', 'QA', 'Interview',
                'Offer', 'Rejected', 'Accepted'],
                default : 'Saved'
        },
        location : {type : String, trim : true},
        jobUrl : {type : String, trim : true},
        notes : {type : String, trim : true},
        appliedDate : {type : Date},
    },
    {
        timestamps : true
    }
)

const model = mongoose.model("Application", applicationSchema)

module.exports = model










// user : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
// type is the ObjectId => saves the user id from User model (refers)
