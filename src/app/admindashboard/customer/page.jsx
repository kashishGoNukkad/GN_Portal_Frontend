"use client"
import React, { useEffect } from "react";
import axios from 'axios'
const page = () => {
  
  const customers = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      totalSpend: 1200.5,
      lastOrderDate: "2024-05-01",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1987654321",
      totalSpend: 850.75,
      lastOrderDate: "2024-05-10",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1122334455",
      totalSpend: 640.0,
      lastOrderDate: "2024-04-25",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      phone: "+2233445566",
      totalSpend: 1500.0,
      lastOrderDate: "2024-05-15",
    },
    {
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      phone: "+3344556677",
      totalSpend: 930.3,
      lastOrderDate: "2024-05-05",
    },
  ];

const customerData = async ()=>{
  try {
    const Customer = await axios.get("http://localhost:3001/allvendors")

    console.log("Customer",Customer)
  } catch (error) {
    console.log("error while getting customer Data",error)
  }
}
useEffect(()=>{
  customerData()
},[])

  return (
    <>
      <div className="p-4 w-full">
        <div className="flex w-full justify-between items-center p-4">
          <div className="text-3xl">Vendor Dashboard</div>
        </div>

        <div className="bg-[#f5f9fc] py-10 px-5 flex flex-col">
          <h2 className="text-2xl mb-4">Customer Details</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Total Spend</th>
                <th className="py-2 px-4 border">Last Order Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{customer.name}</td>
                  <td className="py-2 px-4 border">{customer.email}</td>
                  <td className="py-2 px-4 border">{customer.phone}</td>
                  <td className="py-2 px-4 border">${customer.totalSpend}</td>
                  <td className="py-2 px-4 border">{customer.lastOrderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default page;
