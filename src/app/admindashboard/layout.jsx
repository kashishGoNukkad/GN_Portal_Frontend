'use client';
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// import Header from "./component/Header";
import Header from './Components/Header'
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {useUser} from '../context/userContext'

export default function RootLayout({ children }) {
    const [message, setMessage] = useState()
      const router = useRouter()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/dashboard')
        .then(res => {
           
            
            if(res.data.valid) {
                setMessage(res.data.message)
            } else {
                router.push('/')
            }
        })
        .catch(err => console.log(err))
    })
  const pathname = usePathname();
  const hideHeaderRoutes = [
    "/",
    "/login",
    "/signup",
    "/verifymail",
    "/forgetpassword",
  ];


  const hideHeader = hideHeaderRoutes.includes(pathname);
  const prodata="admin"


  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen overflow-hidden flex h-screen">
          {!hideHeader && (
            <div className="w-[20%]">
              <Header prodata={prodata}  />
            </div>
          )}
          <div className={hideHeader ? "w-full" : "w-[80%]"}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
