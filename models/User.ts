import mongoose, {Schema, model, models} from "mongoose"
import bcrypt from "bcryptjs"
import { timeStamp } from "console"


export interface IUser{
    email:string;
    password:string;
    role: "user" | "admin";
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date; 
}


const userSchema = new Schema<IUser>({
    email:{
        required:true,
        unique:true,
        type:String,
    },
    password:{
        required:true,
        type:String,
    },
    role: {
        type:String,
        enum:["user", "admin"], default:"user"
    }
},{timestamps:true})

// we don't want to create passwords like this so we made hook
userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password =  await bcrypt.hash(this.password, 10)
    }
    next()
});

const User = models?.User ||  model<IUser>("User", userSchema)

export default User;