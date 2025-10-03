import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function GET(){
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:"Unauthorized"}, {status:500})
        }

        await connectToDatabase();

        const orders = await Order.find({userId:session.user.id})
        .populate({ // fill 'productId' field in our Order document which is reference to product field 
            path:"productId",
            select:"name imageUrl", // get only name and url from the product document
            options:{strictPopulate:false}, // even if some fields are missing or mismatched .. proceed with operation
        })
        .sort({createdAt: -1}) // descending order to get more recent orders first
        .lean() // return Js object instead of mongoose document

        return NextResponse.json({orders}, {status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error:"Something went wrong"}, {status:500})
    }
}