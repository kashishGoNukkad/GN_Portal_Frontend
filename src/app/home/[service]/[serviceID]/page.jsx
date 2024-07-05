'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TempHeader from '@/app/admindashboard/Components/TempHeader';
import { useRouter } from 'next/navigation';
import Modal from "../../../admindashboard/Components/Modal";
import axios from 'axios';

const ServiceDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const servicename = searchParams.get('servicename');
  const [service, setService] = useState(null);
  const [isStatus200, setIsStatus200] = useState(null);

 const [modal, setModal] = useState(true);
  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [box, setBox] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const isNameValid = name.trim() !== "";
      const isPhoneValid = /^[0-9]{10}$/.test(mobile);
      const isEmailValid =
        email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      setPhoneError(
        isPhoneValid ? "" : "Please enter a valid 10-digit phone number."
      );

      setIsButtonDisabled(!(isNameValid && isPhoneValid && isEmailValid));

      if (!isNameValid || !isPhoneValid || !isEmailValid) {
        // If the form is invalid, do not proceed
        return;
      }

      // Handle form submission logic here
      console.log({ name, mobile, email });
      setName("");
      setmobile("");
      setEmail("");
      // setEmail2('')
    } catch (error) {
      console.log(error);
    }
  };
  const OtpGenerate = async () => {
    try {
      const response = await axios.post("http://localhost:3001/request-otp", {
        name,
        mobile,
        email,
      });
      setIsOtpGenerated(true);
      if (response.status === 200) {
        setEmail2(email);
      }
      console.log("response", response);
      // setOtp()
    } catch (error) {
      console.log(error);
    }
  };
  const OtpVerify = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/verify-otp",
        {
          email2,
          otp,
        },
        {
          withCredentials: true, // Include credentials (cookies)
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        setIsOtpGenerated(false);
        setModal(false);
        setOtp("");
        setErrorMessage('');
        toast.success("Login success");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsLoggedIn(false);
        setErrorMessage("Invalid or expired OTP");
       
      } else {
        console.log("error", error);
      }
    }
  };
  const HandleOtpChange = (e)=>{
    setOtp(e.target.value);
    if(e.target.value.length < 4){
      setErrorMessage('')
    }
  }
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handlebox = () => {
    setBox(!box);
  };


  useEffect(() => {
    if (servicename) {
      const storedServices = JSON.parse(localStorage.getItem("services"));
      const service = storedServices.find(service => service.name === servicename);
      setService(service);
    }
  }, [servicename]);

  if (!service) {
    return <p>Loading...</p>;
  }

  const GetService = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getservice', { withCredentials: true });
      if (response.status === 200) {
        console.log("Successfully retrieved service:", response.data);
        setIsStatus200(true);
      } else {
        console.log("Error retrieving service:", response.status);
        setIsStatus200(false);
        setModal(true)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access:', error.response.data);
        setIsStatus200(false);
        setModal(true)
      } else {
        console.error('Error retrieving service:', error);
        setIsStatus200(false);
      }
    }
  };

  return (
    <>
      <TempHeader />
      <div className="p-4">
        <h1 className="text-2xl font-bold">{service.name}</h1>
        <p><strong>Category:</strong> {service.category}</p>
        <p><strong>Price:</strong> {service.price}</p>
        <p><strong>Address:</strong> {service.address}</p>
        <p><strong>Location:</strong> {service.location.lat}, {service.location.lng}</p>
        {/* Add other service details as needed */}
        <div className='flex gap-8'>
          <button onClick={() => router.back()} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Go Back
          </button>
          <button onClick={GetService} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Get Service
          </button>
        </div>
      </div>
      {isStatus200 === true && (
        <button className="mt-4 bg-blue-500 text-white p-2 rounded">
          Done
        </button>
      )}
      {isStatus200 === false && (
        <Modal Isvisible={modal} onclose={() => setModal(false)}>
          
             
          {isOtpGenerated ? (
            <form onSubmit={OtpVerify} className="space-y-4">
              <div className="flex flex-col gap-4">
                <span className="text-2xl">Verification code</span>
                <span>We have sent you a 4 digit code on your Email</span>

                <div className="relative border rounded-md">
                  <input
                    type="text"
                    id="otp"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={otp}
                    onChange={HandleOtpChange}
                    // onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                {errorMessage && <div className="text-sm text-red-500">{errorMessage}</div>}
              </div>
              <button
                //  disabled={isButtonDisabled}
                onClick={handleLogin}
                className="p-3 w-full bg-blue-500 rounded-md text-white"
              >
                Proceed
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>} */}
              <div className="flex flex-col gap-4">
                <div className="relative border rounded-md">
                  <input
                    type="text"
                    id="name"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    name*
                  </label>
                </div>
                <div className="relative border rounded-md">
                  <input
                    type="text"
                    id="mobile"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                  />
                  <label
                    htmlFor="mobile"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Mobile*
                  </label>
                </div>
                <div className="relative border rounded-md">
                  <input
                    type="text"
                    id="Email"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="Email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    email
                  </label>
                </div>
              </div>
              <button
                onClick={OtpGenerate}
                className="p-3 w-full bg-blue-500 rounded-md text-white"
              >
                Generate OTP
              </button>
            </form>
          )}
         
        </Modal>
      )}
      
    </>
  );
};

export default ServiceDetails;

