import {getToken} from "next-auth/jwt"
import {NextRequest, NextResponse} from "next/server"

export async function middleware(req:NextRequest){

    // Token will exist if user is logged in
    const  token = await getToken({req,secret: process.env.JWT_SECRET})

    

    // allow the requests if the following is true
    // if it is a request for next-auth session and provider fetching
    //  if the token exists

    if (req.nextUrl.pathname.includes("/api/auth") || token){
        
        return  NextResponse.next()
    }
    
    // Redirect the user to login page if they dont have token
    if (!token  && req.nextUrl.pathname !== "/login" ){
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
        
    } 
}

export const config={
    matcher:["/login","/"]
}
