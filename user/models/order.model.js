import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true,
    },
    orderedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    orderStatus : {
        type : String,
        required : true,
        default : "Pending"
    }
},
    {timestamps : true}
)

const Order = mongoose.model('Order', orderSchema)
export default Order;