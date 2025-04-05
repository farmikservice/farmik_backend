import mongoose from "mongoose"

const agentSchema = new mongoose.Schema({
    
    fullName : {
        type : String,
        required : true,
    },
    phoneNumber : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        uinque : true,
    },
    password : {
        type : String,
        required : true,
    },
    identityType : {
        type : String,
        required : true,
    },
    identityNumber : {
        type : String,
        required : true,
        uinque : true
    }
})

const Agent = mongoose.model('Agent', agentSchema)
export default Agent