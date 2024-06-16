'use client';
import { useState, useEffect } from "react";

import img from "../../Images/sell.jpg";
import Image from "next/image";
import { IoIosAdd } from "react-icons/io";
import Tooltip from "../Components/Tooltip";
import { CiEdit, CiTrash } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

import { toast, Toaster } from "react-hot-toast";

const Users = () => {
  const [data1, setData1] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const formfiled = [
    {
      label: "username",
      type: "text",
    },
    {
      label: "email",
      type: "email",
    },
    {
      label: "mobile",
      type: "text",
    },
    {
      label: "password",
      type: "password",
    },
  ];

  const fetchVendors = async () => {
    try {
      const response = await axios.get('http://localhost:3001/allendusers');
      console.log(response.data.vendors)
  
      const filteredVendors = response.data.vendors.filter(vendors => vendors.status === 'true' && vendors.role==='user');
  
      const reversedVendors = filteredVendors.reverse();
  
      console.log("Reversed Vendors:", reversedVendors);
      setData1(reversedVendors);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    }
  };
  
  useEffect(() => {
  fetchVendors();
}, []);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  
  

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:3001/createenduser', formData, {
        withCredentials: true,
      });

      console.log("User Added Successfully:", response.data);
      setShowForm(false)
      setFormData({
        username: "",
        email: "",
        mobile: "",
        password: "",
      });
      toast.success("User has been registered successfully!");
      fetchVendors();
    } catch (error) {
      console.error("User registration failed", error.response);

      if (error.response && error.response.data && error.response.data.error) {
        // setErrorMessage(error.response.data.error);
        toast.error("Email Already Registered!");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleEdit = async () => {
    
    try {
      const response = await axios.put(`http://localhost:3001/editenduser/${newdata._id}`, newdata);
      fetchVendors();
      setShowEditForm(false)
      toast.success("Vendor edited successfully!")
      console.log("Vendor Edited Successfully:", response.data);
      // Optionally, you can perform further actions after successful edit, such as closing the edit form, updating state, etc.
    } catch (error) {
      console.error("Failed to edit vendor:", error.response);
      // Optionally, you can handle errors here, such as displaying an error message to the user.
    }
  }

  const show = () => {
    setShowForm(true);
  };
  
  const hide = () => {
    setShowForm(false);
    setShowEditForm(false)
  };
  const[newdata,setNewdata]=useState({});
  const[deldata,setDelData]=useState({});
  
  const editoption = (e,index) => {
    setShowEditForm(true)
    const temp=data1[index];
    setNewdata(temp)
    console.log(newdata)

  };
  const Deletetoption = async(e,index) => {
    
    // const temp=data1[index];

    
    
    try {
      const response = await axios.delete(`http://localhost:3001/deleteenduser/${data1[index]._id}`, newdata);
      fetchVendors();
      toast.success("Vendor deleted Successfully!");
      } catch (error) {
      toast.error("Failed to delete vendor!");
    }



  };

  
 

  
  // const fielterData=["username","email",];\
  const handleEditInputChange=(e)=>{
    const{name,value}=e.target
    setNewdata({
      ...newdata,
      [name]:value
    })
    console.log(newdata)
  }

  const filterData=["username","email","mobile"]
  
  return (
    <>
      <div className="relative h-full overflow-scroll">
      <Toaster position="top-center" reverseOrder={false} />
        <div className="p-4 w-full">
          <div className="flex w-full justify-between items-center p-4">
            <div className="text-3xl">Users</div>
            <div className="flex h-fit gap-3">
              <button
                className="px-4 py-2 bg-[#ec3e20] text-white rounded-md border border-1 flex items-center border-gray-300"
                onClick={show}
              >
                <IoIosAdd className="" />
                Create
              </button>
            </div>
          </div>
        </div>
        <div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#f5f9fc] text-gray-600 text-sm border *:text-start">
                <th className="p-4">Name</th>
                <th>Mobile No</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data1.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#fafafa] border text-start relative"
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="flex items-center justify-start ml-4 py-4 gap-4">
                    <Image
                      src={img}
                      alt={item.name}
                      className="size-8 rounded-full"
                    />
                    {item.username}
                  </td>
                  <td className="py-4">{item.mobile}</td>
                  <td className="py-4">{item.email}</td>
                  <td className="py-4">{item.role}</td>
                  <td className="absolute left-56 top-1/2 w-10">
                    {hoveredRow === index && (
                      <div className="transform -translate-y-1/2 flex gap-2">
                        <Tooltip text="Edit">
                          <button className="flex items-center gap-1 bg-white border text-black p-1 rounded">
                            <CiEdit className="size-5" onClick={(e)=>editoption(e,index)}  />
                            {/* <CiEdit className="size-5" onClick={(e)=>editoption(e,index)}  /> */}
                          </button>
                        </Tooltip>
                        <Tooltip text="Delete">
                          <button className="flex items-center gap-1 bg-white border text-black p-1 rounded">
                            <CiTrash className="size-5" onClick={(e)=>Deletetoption(e,index)}  />
                          </button>
                        </Tooltip>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* form */}
        <div
          className={`${
            showForm ? "block" : "hidden"
          } fixed bg-gray-800 bg-opacity-50 top-0 left-0 h-full justify-center py-8 flex items-center w-full`}
        >
          <form className="bg-gray-100 p-10 space-y-6 w-[80%] h-full rounded-md">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl mb-4">User data</h2>
                <RxCross2 className="cursor-pointer size-6" onClick={hide} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {formfiled.map((field, index) => (
                  <div className="relative" key={index}>
                    <input
                      type={field.type}
                      value={formData[field.label]}
                      onChange={(e) => handleInputChange(e, field.label)}
                      id={field.label}
                      className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor={field.label}
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 items-center">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={hide}
                  className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* form */}

        {/* form edit  */}
        <div
          className={`${
            showEditForm ? "block" : "hidden"
          } fixed bg-gray-800 bg-opacity-50 top-0 left-0 h-full justify-center py-8 flex items-center w-full`}
        >
          <form className="bg-gray-100 p-10 space-y-6 w-[80%] h-full rounded-md">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl mb-4">User data</h2>
                <RxCross2 className="cursor-pointer size-6" onClick={hide} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {
                Object.entries(newdata)
                .filter(([key,value],index)=>filterData.includes(key))
                .map(([key,value],index)=>(

                
                // newdata.map((field, index) => (
                  <div className="relative" key={index}>
                    <input
                      type="text"
                      value={value}
                      name={key}
                      onChange={(e) => handleEditInputChange(e,key)}
                      id={key}
                      className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor={key}
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      {key}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 items-center">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={hide}
                  className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* form edit  */}
      </div>
    </>
  );
};

export default Users;
