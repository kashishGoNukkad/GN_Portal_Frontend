// 'use client'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'


// const Dashboard = () => {
//     const [message, setMessage] = useState()

//     const router = useRouter()
//     axios.defaults.withCredentials = true;
//     useEffect(() => {
//         axios.get('http://localhost:3001/dashboard')
//         .then(res => {

//             console.log("res")
//             if(res.data.valid) {
//                 setMessage(res.data.message)
//             } else {
//                 router.push('/')
//             }
//         })
//         .catch(err => console.log(err))
//     })

//     const onLogout = async() =>{
//         try {
//             const response = await axios.post('http://localhost:3001/logout');
//             if (response.status === 200) {
//               router.push('/login');
//             } else {
//               console.error('Logout failed');
//               alert('Logout failed. Please try again.');
//             }
//           } catch (error) {
//             console.error('Error during logout:', error);
//             alert('There was an error during logout. Please try again.');
//           }
//     }

//   return (

//      <div className='h-screen flex flex-col items-center justify-center bg-gray-900 gap-4'>
//         <h2 className='text-2xl text-red-900 font-bold'>Dashboard {message} Successfull</h2>
//         <button className='cursor-pointer w-28 h-12 bg-red-900 text-white p-2 rounded-lg' type="button" onClick={onLogout}>Logout</button>
//     </div>
//   )
// }

// export default Dashboard

'use client'

import React from "react";
import Card from "@/app/admindashboard/Components/Card"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'

const Dashboard = () => {

  const [message, setMessage] = useState()

  // const router = useRouter()
  //   axios.defaults.withCredentials = true;
  //   useEffect(() => {
  //       axios.get('http://localhost:3001/dashboard')
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

  // const onLogout = async() =>{
  //     try {
  //         const response = await axios.post('http://localhost:3001/logout');
  //         if (response.status === 200) {
  //           router.push('/login');
  //         } else {
  //           console.error('Logout failed');
  //           alert('Logout failed. Please try again.');
  //         }
  //       } catch (error) {
  //         console.error('Error during logout:', error);
  //         alert('There was an error during logout. Please try again.');
  //       }
  // }


  const data = [
    {
      title: "david",
      value: "23423",
    },
    {
      title: "david",
      value: "23423",
    },
    {
      title: "david",
      value: "23423",
    },
    {
      title: "david",
      value: "23423",
    },
  ];
  const data1 = [
    {
      title: "Vendor",
      value: "23423",
    },
    {
      title: "V2",
      value: "23423",
    },
    {
      title:"v3",
      value: "23423",
    },
    {
      title: "david",
      value: "23423",
    },
  ];
  const temp = "admin"
  return (
    <>
      {/* {message} */}
      {
        temp === "admin" ? (<> <div className="h-full overflow-scroll">
          <div className="p-4  w-full ">
            <div className="flex w-full justify-between items-center p-4">

              <div className="text-3xl">Dashboard</div>
              <div className="flex h-fit gap-3">
              </div>
            </div>
          </div>

          <div className="bg-[#f5f9fc] flex justify-evenly py-10 items-center gap-5 px-5 flex-wrap overflow-x-auto w-full">
            {data.map((item, index) => (
              <Card key={index} title={item.title} value={item.value} />
            ))}
          </div>


        </div></>) : (<> <div className="h-full overflow-scroll">
          <div className="p-4  w-full ">
            <div className="flex w-full justify-between items-center p-4">

              <div className="text-3xl">Vendor</div>
              <div className="flex h-fit gap-3">
              </div>
            </div>
          </div>

          <div className="bg-[#f5f9fc] flex justify-evenly py-10 items-center gap-5 px-5 flex-wrap overflow-x-auto w-full">
            {data1.map((item, index) => (
              <Card key={index} title={item.title} value={item.value} />
            ))}
          </div>


        </div></>)
      }
    </>
  );
};

export default Dashboard;
