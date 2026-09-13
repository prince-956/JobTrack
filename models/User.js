const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name : {type : String, required : true, trim : true},
        email : {type : String, required : true, unique : true, lowercase : true, trim : true},
        password : {type : String, required : true}
    },
    {
        timestamps : true
    }
)
// timestamp - that adds the 2 fields : createdAt, updatedAt

const model = mongoose.model('User', userSchema)

module.exports = model