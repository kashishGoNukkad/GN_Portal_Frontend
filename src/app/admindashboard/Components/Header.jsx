"use client"
import React from 'react'
import Link from 'next/link';
import { CiHome } from "react-icons/ci";
import { BsCollection } from "react-icons/bs";
import { FaChartBar, FaEnvelope, FaUsers } from "react-icons/fa";
import Image from 'next/image';
import img from '../../Images/sell.jpg';
import gonukkad from '../../Images/logo.webp';

const Header = ({prodata}) => {
  const data = [
    { title: "Dashboard", icon: <CiHome />, link: "/admindashboard" }, 
    { title: "Vendors", icon: <FaUsers />, link: "/admindashboard/users" },
    { title: "Analytics", icon: <FaChartBar />, link: "/admindashboard/analytics" }, 
    { title: "Message", icon: <FaEnvelope />, link: "/admindashboard" },
    { title: "Collection", icon: <BsCollection />, link: "/admindashboard" },
     // Add link for Users
  ];
  const data3 = [
    // { title: "Dashboard", icon: <CiHome />, link: "/admindashboard" }, 
    { title: "Vendors", icon: <FaUsers />, link: "admindashboard/users" },
    { title: "Analytics", icon: <FaChartBar />, link: "/admindashboard/analytics" }, 
    { title: "Message", icon: <FaEnvelope />, link: "/admindashboard" },
    { title: "Collection", icon: <BsCollection />, link: "/admindashboard" },
     // Add link for Users
  ];
  
  const contactdata = [
    { imglink: img, name: "david", country: "ind", status: 1 }, 
    { imglink: img, name: "warner", country: "ind", status: 0 }, 
    { imglink: img, name: "fab", country: "ind", status: 1 },
    { imglink: img, name: "du plesis", country: "ind", status: 0 },
    { imglink: img, name: "finch", country: "ind", status: 1 }
  ];

  return (
    <>
      <div className=' flex flex-col top-0 h-screen w-full z-[99] border-2 overflow-y-scroll'>
        <ul className=' w-full pb-4'>
          <div className='flex gap-4 p-4 items-center'>
          <Image src={gonukkad} alt={"alt"} className='h-20 w-60 rounded-full' />
          {/* <h1 className='text-2xl font-semibold'>Admin Portal</h1> */}
          </div>
          {prodata!=="vendor"?(<>{data.map((item, index) => (
            <Link key={index} href={item.link}>
                <li className='flex items-center hover:bg-slate-300 p-4 space-y-4'>
                  <div className='flex items-center space-x-2'>
                    
                <span className='text-[#ec3e20]'>{item.icon}</span>
                <span>{item.title}</span>
                  </div>
            </li>
              </Link>
          ))}</>):(<>{data3.map((item, index) => (
            <Link key={index} href={item.link}>
                <li className='flex items-center hover:bg-slate-300 p-4 space-y-4'>
                  <div className='flex items-center space-x-2'>
                    
                <span className='text-[#ec3e20]'>{item.icon}</span>
                <span>{item.title}</span>
                  </div>
            </li>
              </Link>
          ))}</>)}
        </ul>

        <hr />
        <div className='flex flex-col justify-start mt-8'>
          <h1 className='text-2xl pl-8'>Contact</h1>
          {/* <h1 className='text-2xl pl-8'>{prodata}</h1> */}
          <ul className='flex flex-col items-center justify-center'>
            {contactdata.map((item, index) => (
              <li key={index} className='flex w-full py-1 gap-4 hover:bg-slate-300 mt-8'>
                <div className='flex gap-4 w-[80%] mx-auto'>
                  <div className='relative size-12'>
                    <Image src={item.imglink} alt={item.name} className='size-12  rounded-full absolute' />
                    <div className={`size-3 border-2 border-white rounded-full absolute ${item.status === 1 ? 'bg-green-600' : 'bg-red-600'} bottom-0 right-1`}></div>
                  </div>
                  <div className='flex flex-col h-12 items-start justify-center'>
                    <p className='text-sm'>{item.name}</p>
                    <p className='text-gray-500'>{item.country}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
