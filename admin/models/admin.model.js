import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    uid: Number,
    name: String,
    password: String
})

const Admin = mongoose.model('Admin', adminSchema)
export default Admin
