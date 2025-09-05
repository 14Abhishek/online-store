import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const MONGODB_URI = process.env.MONGODB_URI || ""

if(!MONGODB_URI){
    throw new Error("Check your mongodb connection string")
}

let cached = global.mongoose
if(!cached){
    cached = global.mongoose = {con:null, promise:null}
}


export async function connectToDatabase(){
    if(cached.con){
        return cached.con;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands:true, // buffers the commands in mongodb.. like if the connection hasnt been made.. and we are already making a command/query. .then mongodb will buffer that 
            maxPoolSize:10, // opt this out ...if atlas plan is low tier (btw it means Mongoose will allow up to 10 concurrent connections)
        };
        cached.promise = mongoose.connect(MONGODB_URI,opts).then(()=>mongoose.connection) // we returned connection object (mongoose.connection) so that we can then reuse it to manage the state of connection.. by using event handlers? nd shit
    }
    try {
        cached.con = await cached.promise
    } catch (error) {
        cached.promise = null;
    }

    return cached.con
}