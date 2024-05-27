"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEamil() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response =await axios.post('http://localhost:3001/verifymail', {token})
            console.log("response",response)
            if(response.data.success){
                setVerified(true);
                setMessage("Email Verified Successfully!")
            }
            else{
                setVerified(true);
                setMessage("User Already Verified!")
            }
        } catch (error) {
            setError(true);
            console.log("error", error);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">

            {/* <h1 className="text-4xl text-red-900 font-bold">Verify Email</h1> */}
            {/* <h2 className="p-2 bg-orange-500 text-black">{token ? ${token} : "no token"}</h2> */}

            {verified ?  (
                <div className="flex flex-col items-center justify-center gap-6">
                    <h2 className="text-4xl text-red-900 font-bold">{message}</h2>
                    <button className="w-28 h-12 bg-red-900 text-white rounded-lg p-2 text-xl">
                        <Link href="/login">
                         Login
                        </Link>
                    </button>
                </div>
            ):(
                <div>
                    <h2 className="text-4xl text-red-900 font-bold">Loading...</h2>
                    
                </div>
            )
        }
            
        </div>
    )

}