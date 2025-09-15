import {withAuth} from "next-auth/middleware"

export default withAuth(
    // it arguments our 'Request' with user's token
    function middleware(req){
        console.log(req.nextauth.token)
    },
    {
        callbacks:{
            authorized:({token}) => token?.role === "admin",
        },
    },
)

// middleware funciton will only be invoked if the autohrized callback returns true

export const config = {matcher:["/admin"]}