"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiHome } from "react-icons/ci";
import { BsCollection } from "react-icons/bs";
import { FaChartBar, FaEnvelope, FaUsers } from "react-icons/fa";
import Image from "next/image";
import img from "../../Images/sell.jpg";
import gonukkad from "../../Images/logo.webp";
import { useUser } from '../../context/userContext';
import { useSelector } from "react-redux";



const Header = () => {

  
  const userRole = useSelector((data)=>data.users)
  // console.log(userRole[2]);

  if(userRole.length>0){
    localStorage.setItem('userRole', userRole[2])
  }
  const Role = localStorage.getItem('userRole');

console.log("useRole", Role)
  const data = [
    { title: "Dashboard", icon: <CiHome />, link: "/admindashboard" },
    { title: "Vendors", icon: <FaUsers />, link: "/admindashboard/vendors" },
    { title: "Users", icon: <FaUsers />, link: "/admindashboard/users" },

  ];
  const data3 = [
    { title: "VendorDashboard", icon: <CiHome />, link: "/admindashboard" },
    { title: "Customer", icon: <CiHome />, link: "/admindashboard/customer" },

  ];
  const data4 = [
    { title: "UserDashboard", icon: <CiHome />, link: "" },

  ];


 

  return (
    <div className="flex flex-col top-0 h-screen w-full z-[99] border-2 overflow-y-scroll">
      <ul className="w-full pb-4">
        <div className="flex gap-4 p-4 items-center">
          <Image src={gonukkad} alt={"alt"} className="h-20 w-60 rounded-full" />
        </div>
        {
          Role === "vendor" ? (
            data3.map((item, index) => (
              <Link key={index} href={item.link}>
                <li className="flex items-center hover:bg-slate-300 p-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#ec3e20]">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </li>
              </Link>
            ))
          ) : Role === "user" ? (
            data4.map((item, index) => (
              <Link key={index} href={item.link}>
                <li className="flex items-center hover:bg-slate-300 p-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#ec3e20]">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </li>
              </Link>
            ))
          ) : (
            data.map((item, index) => (
              <Link key={index} href={item.link}>
                <li className="flex items-center hover:bg-slate-300 p-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#ec3e20]">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </li>
              </Link>
            ))
          )
        }
       
      </ul>
    </div>
  );
};

export default Header;
