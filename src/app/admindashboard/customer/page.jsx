"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios'
const page = () => {
  const [user, setuser] = useState([])

  const TableHead = [
    {
      label: "name",
      label: "Email",
      label: "Mobile",
      label: "Buisness name",
      label: "Address",
    }
  ]

  const customerData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/allvendors")

      const filteredcustomer = response.data.vendors.filter(
        (vendor) => vendor.status === "true" && vendor.role === "user"
      );
      setuser(filteredcustomer)
      console.log("filtercustomer", filteredcustomer)
    } catch (error) {
      console.log("error while getting customer Data", error)
    }
  }
  useEffect(() => {
    customerData()
  }, [])
  console.log("user from customer", user)
  return (
    <>
      <div className=" w-full ">
        <div className="flex w-full justify-between items-center p-4">
          <div className="text-3xl">Vendor Dashboard</div>
        </div>

        <div className="  py-10 flex flex-col">
          <h2 className="text-2xl mb-4">Customer Details</h2>
          {/* <table className="min-w-full bg-white border">
            <thead>
              <tr>
                {
                 
                }
                
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
          </table> */}
          <div>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#f5f9fc] text-gray-600 text-sm border *:text-start">
                  <th className="p-4">Name</th>
                  <th>Mobile No</th>
                  <th>Email</th>
                  {/* <th>Role</th> */}
                  <th>Buisness Name</th>
                  <th>Address</th>
                  <th>Buisness Phone</th>

                  <th></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* {
                 Object.entries(user)
                 .filter(([key,value],index)=>key!="userInfo")
                 .map(([key,value],index)=>(
                  <tr key={index}>
                      <td>
                        {value}
                      </td>
                    </tr>
                 ))
                } */}

                {/* {Object.entries(user)
                  .map(([key, value], index) => (
                    Object.entries(key)
                    .filter(([secondkay,secondvalue],secondindex)=>secondkay!="userInfo")
                    .map(([secondkay,secondvalue],secondindex)=>(
                      <div className="relative">
                          <label
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                          >
                            {secondkay}
                          </label>
                        </div>
                    ))
                  ))} */}

                {
                  user.map((ele, index) => (
                    <tr className="bg-gray-100 hover:bg-red-100 border *:p-2">
                      <td className="">
                        {ele["username"]}
                      </td>
                      <td>
                        {ele["mobile"]?ele["mobile"]:"-----"}
                      </td>
                      <td>
                        {ele["email"]?ele["email"]:"-----"}
                      </td>
                      <td>
                        {
                         
                          ele["userInfo"].Buisness_Name?ele["userInfo"].Buisness_Name:"-----"
                        }
                        {}
                      </td>
                      <td>
                        {ele["userInfo"].address?ele["userInfo"].address:"-----"}
                      </td>
                      <td>
                        {ele["userInfo"].Buisness_Phone?ele["userInfo"].Buisness_Phone:"-----"}
                      </td>
                    </tr>
                  ))
                }




              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
