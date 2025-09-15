import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const {email, password} = await request.json()
        if(!email || !password){
            return NextResponse.json({error:"email nd Password required"}, {status:400})
            await connectToDatabase()
            const existingUser = await User.findOne({email})
            if(existingUser){
                return NextResponse.json({error:"Email exists in our db"}, {status:400})
            }
            User.create(
                {email, password, role:"user"}
            )
            return NextResponse.json(
                {message:"User registered with no problemo"},
                {status:200}
            )
        }
    } catch (error) {
        console.error("Registration Error: ", error)
        return NextResponse.json({error:"Registration error"}, {status:501})
    }
}