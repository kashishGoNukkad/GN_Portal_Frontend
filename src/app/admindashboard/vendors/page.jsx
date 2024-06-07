"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosAdd } from "react-icons/io";
import Tooltip from "../Components/Tooltip";
import { CiEdit, CiTrash } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import img from "../../Images/sell.jpg";

const Steps = [
  {
    id: "step1",
    basicInfo: "Personal Info",
    fields: [
      { label: "username", type: "text" },
      { label: "email", type: "email" },
      { label: "mobile", type: "text" },
      { label: "password", type: "password" },
    ],
  },
  {
    id: "step2",
    basicInfo: "Address",
    fields: [
      { label: "address", type: "text" },
      { label: "city", type: "text" },
    ],
  },
  {
    id: "step3",
    basicInfo: "Business Information",
    fields: [
      { label: "Buisness_Name", type: "text" },
      { label: "Buisness_Phone", type: "text" },
    ],
  },
];
const totalFields = Steps.reduce((acc, step) => acc + step.fields.length, 0);

const StepForm = ({ currentStep, formData, handleInputChange }) => {
  // const { fields } = Steps[currentStep];
  const { fields = [] } = Steps[currentStep] || {};
  // const[temp,]
  return (
    <div className="grid grid-cols-1 gap-8">
      {fields.map((field, index) => (
        <div className="relative" key={index}>
          <input
            type={field.type}
            value={formData[field.label] || ""}
            onChange={(e) => handleInputChange(e, field.label)}
            id={field.label}
            className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor={field.label}
            className="absolute text-sm text-gray-500 dark  :text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            {field.label}
          </label>
        </div>
      ))}
    </div>
  );
};

const Users = () => {

  const flattenData = (data) => {
    const flattened = { ...data, ...data.userInfo };
    delete flattened.userInfo;
    return flattened;
  };
  
  const [data1, setData1] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [temp , setTemp] = useState({});
  const [formData, setFormData] = useState({});
  const [showedit, setshowedit] = useState(false);
  const[newdata,setNewdata]=useState(flattenData(data1));
 
  useEffect(()=>{
    if(temp.length!==0){
      setFormData(temp)
    }
  })

  const fetchVendors = async () => {
    try {
      const response = await axios.get("http://localhost:3001/allvendors");
      const filteredVendors = response.data.vendors.filter(
        (vendor) => vendor.status === "true" && vendor.role === "vendor"
      );
      const filteredVendor = response.data.vendors;

      console.log("Filtered", filteredVendors);
      console.log("Filter", filteredVendor);
      setData1(filteredVendors.reverse());
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setTemp(({ ...formData, [field]: value }))
    

    setFormData({ ...formData, [field]: value });
  };
  useEffect(() => {
    var count = Object.entries(formData)
      .map(([key, value], index) => value)
      .filter((value) => value !== "");
    if (progress <= 100) {
      const percentIncreaseValue = (1 / totalFields) * 100;
      let newIncrease = percentIncreaseValue * count.length;

      setProgress(newIncrease);
    }
  }, [formData]);

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/createvendor",
        formData,
        { withCredentials: true }
      );
      console.log("response form", response);
      setShowForm(false);
      setFormData({});

      toast.success("Vendor has been registered successfully!");
      setTemp({})
      fetchVendors();
    } catch (error) {
      console.error("Vendor registration failed", error.response);
      toast.error(error.response?.data?.error || error.message);
    }
  };


  const handleEdit = async () => {
    
    try {
      const response = await axios.put(`http://localhost:3001/editvendor/${newdata._id}`, newdata);
      fetchVendors();
      setshowedit(false)
      toast.success("Vendor edited successfully!")
      console.log("Vendor Edited Successfully:", response.data);
      // Optionally, you can perform further actions after successful edit, such as closing the edit form, updating state, etc.
    } catch (error) {
      console.error("Failed to edit vendor:", error.response);
      // Optionally, you can handle errors here, such as displaying an error message to the user.
    }
  }

  const DeleteVendor = async (e, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/deletevendor/${data1[index]._id}`
      );

      fetchVendors();
      toast.success("Vendor deleted Successfully!");
    } catch (error) {}
  };

  const handleNext = async () => {
    if (currentStep === Steps.length - 1) {
      
      // Call handleAdd if it's the last step
      await handleAdd();
    } else {
      // Proceed to the next step
      setCurrentStep(currentStep + 1);
    }
   
      console.log(temp)
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const[temddata,setTempdata]=useState({});
  
  const vendoredit = (index) => {
    setshowedit(true);
    const flattenedData = flattenData(data1[index]);
    setTempdata(flattenedData);
  };

  useEffect(()=>{
    setNewdata(temddata)
    console.log("tempdata",temddata)
},[temddata])
 
  const vendorhide = () => {
    setshowedit(false);
  };

  const handlestepclick = (step) => {
    if (currentStep < 3) {
      setCurrentStep(step - 1);
    }
  };

  const show = () => {
    setShowForm(true);
  };

  const hide = () => {
    console.log(temp)
    
    setShowForm(false);
    setShowEditForm(false);
    setCurrentStep(0);
    setFormData({});
  };
  const [progress, setProgress] = useState(0);
  

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setNewdata({ ...newdata, [name]: value });
  };

  const filterData = ["username", "email", "mobile", "address", "city", "Buisness_Name", "Buisness_Phone"];
  // const progress = (currentStep / (Steps.length - 1)) * 100;
  return (
    <>
      <div className="relative h-full scroll-auto">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="p-4 w-full">
          <div className="flex w-full justify-between items-center p-4">
            <div className="text-3xl">Vendors</div>
            <button
              className="px-4 py-2 bg-[#ec3e20] text-white rounded-md border border-1 flex items-center border-gray-300"
              onClick={show}
            >
              <IoIosAdd />
              Create
            </button>
          </div>
        </div>
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
              {data1.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#fafafa] border text-start  relative"
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="flex items-center justify-start ml-4 py-2 gap-2">
                    <Image
                      src={img}
                      alt={item.name}
                      className="size-8 rounded-full"
                    />
                    {item.username}
                  </td>
                  <td className="py-2 ">{item.mobile}</td>
                  <td className="py-2">{item.email}</td>
                  {/* <td className="py-2">{item.role}</td> */}
                  <td className="py-2">{item.userInfo.Buisness_Name}</td>
                  <td className="py-2">{item.userInfo.address}</td>
                  <td className="py-2">{item.userInfo.Buisness_Phone}</td>
                  <td className="absolute left-36 top-1/2 w-10">
                    {hoveredRow === index && (
                      <div className="transform -translate-y-1/2 flex gap-2">
                        <Tooltip text="Edit">
                          <button className="flex items-center gap-1 bg-white border text-black p-1 rounded">
                            <CiEdit className="size-5" onClick={()=>vendoredit(index)} />
                          </button>
                        </Tooltip>
                        <Tooltip text="Delete">
                          <button className="flex items-center gap-1 bg-white border text-black p-1 rounded">
                            <CiTrash
                              className="size-5"
                              onClick={(e) => DeleteVendor(e, index)}
                            />
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
          <form className="bg-gray-100 p-10 space-y-6 w-[50%]  h-full rounded-md relative">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <RxCross2
                  className="cursor-pointer size-6 absolute -top-5 -right-5"
                  onClick={hide}
                />
              </div>
              {/* Progress bar */}
              <div className="relative w-full h-1 rounded-md bg-gray-200">
                <div
                  className="absolute  rounded-md top-0 left-0 h-1.5 bg-blue-500"
                  style={{ width: `${progress}%` }}
                ></div>
                <div className="absolute right-0 -top-6">
                  <p>{Math.ceil(progress)}% Profile complete</p>
                </div>
              </div>

              {/* Progress bar */}

              <StepForm
                currentStep={currentStep}
                formData={formData}
                handleInputChange={handleInputChange}
              />
              <div className="flex justify-end gap-4 items-center">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                  >
                    PREV
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                >
                  {currentStep === Steps.length - 1 ? "SUBMIT" : "NEXT"}
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* form */}
        {/* className={`${
            showForm ? "block" : "hidden"
          } fixed bg-gray-800 bg-opacity-50 top-0 left-0 h-full justify-center py-8 flex items-center w-full`} */}

        <div className="h-screen w-full bg-opacity-50 flex items-center justify-center">
          {showedit && (
            <form className="absolute top-6   bg-gray-100 p-10 space-y-6 w-[80%] h-fit rounded-md ">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl mb-4">Vendor data</h2>
                  <RxCross2 className="cursor-pointer size-6" onClick={vendorhide} />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {Object.entries(newdata)
                    .filter(([key]) => filterData.includes(key))
                    .map(([key, value], index) => (
                      <div className="relative" key={index}>
                        <input
                          type="text"
                          value={value}
                          name={key}
                          id={key}
                          onChange={handleEditInputChange}
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
                    className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                    onClick={handleEdit}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                    onClick={vendorhide}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
