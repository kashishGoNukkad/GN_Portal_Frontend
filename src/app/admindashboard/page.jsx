"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const Role = localStorage.getItem("userRole");

  useEffect(() => {
    if (Role === "vendor") {
      fetchCustomers();
    }
  }, [Role]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/vendor/customers", {
        withCredentials: true,
      });
      setCustomers(response.data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <>
      {Role === "vendor" ? (
       <>
       <div className="p-4 w-full">
          <div className="flex w-full justify-between items-center p-4">
            <div className="text-3xl">Vendor Dashboard</div>
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
