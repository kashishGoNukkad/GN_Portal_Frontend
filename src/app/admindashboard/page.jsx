"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Image from "next/image";
import img from "../Images/sell.jpg";
const Dashboard = () => {
  const [vendorInfo, setvendorInfo] = useState([]);
  const Role = localStorage.getItem("Roles");
  const user_id = localStorage.getItem("id");

  useEffect(() => {
    if (Role === "vendor") {
      fetchCustomers();
    }
  }, [Role]);
  useEffect(() => {}, [vendorInfo]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/FindvendorById/${user_id}`,
        {
          withCredentials: true,
        }
      );

      setvendorInfo(response.data.vendor);
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };
  console.log("vendor info", vendorInfo.userInfo);
  const infoEntries = [
    ["Name", vendorInfo.username],
    ["Email", vendorInfo.email],
    ["Mobile", vendorInfo.mobile || "N/A"],
    ["Buisness", vendorInfo.userInfo?.Buisness_Name || "N/A"],
    ["Phone", vendorInfo.userInfo?.Buisness_Phone || "N/A"],
    ["Address", vendorInfo.userInfo?.address || "N/A"],
  ];
  return (
    <>
      {Role === "vendor" ? (
        <>
          <div className="p-4 gap-5 w-full">
            <div className="flex w-1/3 flex-col  justify-between items-center p-4 gap-4">
              <div className=" border-2 border-green-500    flex  items-center rounded-full">
                <Image
                  className="h-20 w-20 rounded-full"
                  src={img}
                  alt="img"
                ></Image>
              </div>
              <div className="flex flex-col gap-4  w-full">
                {infoEntries.map((item, index) => (
                  <div className="flex justify-between items-center  gap-4">
                   <div className="flex justify-between items-center w-full gap-4">
                   <span className="w-1/2">{item[0]}</span>
                   <span className="flex-grow">{item[1]}</span>
                   </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : Role === "Admin" ? (
        <div className="p-4 w-full">
          <div className="flex w-full justify-between items-center p-4">
            <div className="text-3xl">Admin Dashboard</div>
          </div>
        </div>
      ) : (
        <div>User Dashboard</div>
      )}
    </>
  );
};

export default Dashboard;
