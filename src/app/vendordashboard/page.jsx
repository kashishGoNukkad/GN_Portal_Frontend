'use client'

import React from "react";
import Card from "@/app/admindashboard/Components/Card"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios'

const Dashboard = () => {

  

  

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
   

//   const data = [
//     {
//       title: "david",
//       value: "23423",
//     },
//     {
//       title: "david",
//       value: "23423",
//     },
//     {
//       title: "david",
//       value: "23423",
//     },
//     {
//       title: "david",
//       value: "23423",
//     },
//   ];
  return (
    <>
    {/* {message} */}
      <div className="h-full overflow-scroll">
        <div className="p-4  w-full ">
          <div className="flex w-full justify-between items-center p-4">
            <div className="text-3xl">Vendor Dashboard</div>
            <div className="flex h-fit gap-3">
            </div>
          </div>
        </div>
{/* 
        <div className="bg-[#f5f9fc] flex justify-evenly py-10 items-center gap-5 px-5 flex-wrap overflow-x-auto w-full">
          {data.map((item, index) => (
            <Card key={index} title={item.title} value={item.value} />
          ))}
        </div> */}

       
      </div>
    </>
  );
};

export default Dashboard;