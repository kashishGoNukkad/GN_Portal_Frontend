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


export default function RootLayout({ children }) {
    const [message, setMessage] = useState()
      const router = useRouter()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/dashboard')
        .then(res => {
           
            console.log("res")
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

//   const router = useRouter()

//   axios.defaults.withCredentials = true;
//   useEffect(() => {
//       axios.get('http://localhost:3001/admindashboard/users')
//       .then(res => {
         
//           console.log("res")
//           if(res.data.valid) {
//               setMessage(res.data.message)
//           } else {
//               router.push('/')
//           }
//       })
//       .catch(err => console.log(err))
//   })
  const hideHeader = hideHeaderRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen overflow-hidden flex h-screen">
          {!hideHeader && (
            <div className="w-[20%]">
              <Header />
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
