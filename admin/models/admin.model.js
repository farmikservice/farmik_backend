import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    uid: {
        type : Number,
        required : true,
        unique : true,
    },
    name: {
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required : true,
        unique : true,
    }
})

const Admin = mongoose.model('Admin', adminSchema)
export default Admin
