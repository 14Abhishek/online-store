import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // it arguments our 'Request' with user's token
    function middleware(req){
        return NextResponse.next()

    },
    {
        callbacks:{
            authorized:({token, req}) =>{
                const {pathname} = req.nextUrl;

                if(pathname.startsWith("/api/webhook")){
                    return true;
                }

                // allow auth related paths
                if(
                    pathname.startsWith("api/auth") || 
                    pathname === "/login" || 
                    pathname === "/register"
                ){
                    return true;
                }
                // public routes]
                if(
                    pathname==="/" ||
                    pathname.startsWith("/api/products") ||
                    pathname.startsWith("products") 
                ){
                    return true;
                }
                // admin routes require admin role 
                if(pathname.startsWith("/admin")){
                    return token?.role === "admin";
                }
                // !! is double negation .. which converts value into boolean
                return !!token;
                // if the token is valid it returns true else it returns false 
            } ,
        },
    },
)

// middleware funciton will only be invoked if the autohrized callback returns true

export const config = {
  matcher: [
    /**
    Match all request paths except (run the middleware on all the routes except) :
    - _next/static (static files)
    - _next/image (image optimization files)
    - favicon.ico (favicon file)
    - public folder
    
    */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)"
  ]
};
