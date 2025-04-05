import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

    brand : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    area : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    image :  {
        type : String,
        required : true,
        default : 'https://picsum.image?random=1'
    },
    description : {
        type : String,
        required : true,
    },
    pincode : {
        type : String,
        required : true,
        minLength : 6,
        maxLength : 6
    },
    district : {
        type : String,
        required : true,
    },
    tehsil : {
        type : String,
        required : true,
    },
    landmark : {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

})

const Product = mongoose.model('Product', productSchema)
export default Product