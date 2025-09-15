import mongoose, {MongooseError, Schema, model, models} from "mongoose"
import { ImageVariant, ImageVariantType } from "./Product";

interface PopulatedUser {
    _id:mongoose.Types.ObjectId;
    email:string;
}
// we don't want to send the req to database with 1st req for user and 2nd req for product... we want to populated details of both to be sent in one go 
interface PopulatedProduct {
    _id:mongoose.Types.ObjectId;
    name:string;
    imageUrl: string;
}

export interface IOrder {
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId | PopulatedUser;
    productId: mongoose.Types.ObjectId | PopulatedProduct;
    variant: ImageVariant;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    amount: number;
    status: "pending" | "completed" | "failed";
    downloadUrl?: string;
    previewUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>({
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
    variant:{
        type:{
            type:String,
            required:true,
            enum: ["SQUARE", "WIDE", "PORTRAIT"] as ImageVariantType[],
            set: (v: string) => v.toUpperCase(),
        },
        price: {type:Number, required: true},
        license:{
            type:String,
            required:true,
            enum:["personal", "commercial"],

        }
    },

    razorpayOrderId:{type:String, required:true},
    razorpayPaymentId:{type:String, required:true},
    amount: {type:Number, required:true},
    status:{
        type:String,
        required:true,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    downloadUrl: {type:String},
    previewUrl:{type:String},   
},{timestamps:true})


const Order = models?.Order ||  model("Order", orderSchema)

export default Order;