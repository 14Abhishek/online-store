import mongoose, {Schema, model, models} from "mongoose"



const orderSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    productId:{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required:true
    },
    variant:["SQUARE", "WIDE", "PORTRAIT"],
    price:{
        type:Number,
        required:true
    },
    license:{
        type:String,
        required:true,
        enum:["personal", "commercial"],
    },
    razorpayOrderId:{type:String, required:true},
    razorpayPaymentId:{type:String, required:true}

},{timestamps:true})


const Order = models?.Order ||  model("Order", orderSchema)

export default Order;