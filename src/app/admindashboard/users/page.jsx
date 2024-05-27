"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import img from "../../Images/sell.jpg"
import Image from "next/image";
import { IoIosAdd } from "react-icons/io";
import Tooltip from "../Components/Tooltip";
import { CiEdit, CiTrash } from "react-icons/ci"; // Make sure to install react-icons if you haven't already
import { RxCross2 } from "react-icons/rx";
import axios from "axios";


const Users = () => {

    // const router = useRouter()

    // axios.defaults.withCredentials = true;
    // useEffect(() => {
    //     axios.get('http://localhost:3001/admindashboard/users')
    //     .then(res => {
           
    //         console.log("res")
    //         if(res.data.valid) {
    //             setMessage(res.data.message)
    //         } else {
    //             router.push('/')
    //         }
    //     })
    //     .catch(err => console.log(err))
    // })
    
  const data1 = [
    {
      name: "John Doe",
      date: "Feb 15, 2021",
      company: "ABC Corp",
      offer: "Yes",
      meeting: "Feb 15, 2021",
    },
    {
      name: "Jane Smith",
      date: "Feb 15, 2021",
      company: "XYZ Inc",
      offer: "No",
      meeting: "Feb 15, 2021",
    },
    // add more rows as needed
  ];
  const formfiled = [
    {
      label: "name",
      type: "text",
    },
    {
      label: "Email",
      type: "email",
    },
    {
      label: "password",
      type: "password",
    },
    {
      label: "Address",
      type: "text",
    },
  ]

  const [hoveredRow, setHoveredRow] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [data, setdata] = useState("");
  const show = () => {
    setShowForm(true);
  };
  const hide = () => {
    setShowForm(false);
  };
  const editoption = () => {
    alert("edit Option")
  }
  return (
    <>
      <div className="relative h-full overflow-scroll">
        <div className="p-4 w-full">
          <div className="flex w-full justify-between items-center p-4">
            <div className="text-3xl">Vendors</div>
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
              <tr className="bg-[#f5f9fc] text-gray-600 text-sm border   *:text-start">
                <th className="p-4">Name</th>
                <th>Address</th>
                <th>Company</th>
                <th>Status</th>
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
                    {item.name}
                  </td>
                  <td className="py-4">{item.date}</td>
                  <td className="py-4">{item.company}</td>
                  <td className="py-4 relative">{item.offer}</td>
                  <td className="absolute left-80 top-1/2 w-10">
                    {hoveredRow === index && (
                      <div className=" transform -translate-y-1/2 flex gap-2">
                        <Tooltip text="Edit">

                          <button className="flex items-center gap-1  bg-white border text-black p-1 rounded">
                            <CiEdit className="size-5 " onClick={editoption} />

                          </button>
                        </Tooltip>
                        <Tooltip text="Delete">
                          <button className="flex items-center gap-1 bg-white border text-black p-1 rounded">
                            <CiTrash className="size-5" />
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
        {/* form  */}`
        <div
          className={`${showForm ? "block" : "hidden"
            } fixed  bg-gray-800 bg-opacity-50  top-0 left-0 h-full justify-center py-8 flex items-center w-full  `}
        >
          <form className="bg-gray-100 p-10 space-y-6 w-[80%] h-full rounded-md " >
            <div className="space-y-6">
              {/* {editIndex !== null ? "Edit Vendor" : "Add Vendor"} */}
              <div className="flex justify-between items-center"> <h2 className="text-xl mb-4">User data</h2>
                <RxCross2 className="cursor-pointer size-6" onClick={hide} /></div>
              <div className="grid grid-cols-2 gap-8">
                {

                  formfiled.map((value, index) => (
                    <>
                      <div className="relative" key={index}>
                        <input
                          type={value.type}
                          value={data}
                          onChange={(e) => setdata(e.target.value)}
                          id="name"
                          className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          for="name"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                          {value.label}
                        </label>
                      </div>
                    </>

                  ))
                }

              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  // onClick={handleAdd}
                  className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                >
                  {/* {editIndex !== null ? "Update" : "Add"} */}
                  Add Data
                </button>
                <button
                  type="button"
                  onClick={hide}
                  className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                >
                  {/* {editIndex !== null ? "Update" : "Add"} */}
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* form */}
      </div>
    </>
  );
};

export default Users;
