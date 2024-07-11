'use client'
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import TempHeader from '@/app/admindashboard/Components/TempHeader';
import { useRouter } from 'next/navigation';
import Modal from "../../../admindashboard/Components/Modal";
import axios from 'axios';
import Footer from '@/app/admindashboard/Components/Footer';
import Bike from '../../../../../public/assets/Bike.jpeg';
import Image from 'next/image';
import ProfileModal from '@/app/admindashboard/Components/profileModal';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../Redux/Slices/authSlice'



const ServiceDetails = () => {
  const { user, sessionId, status } = useSelector((state) => state.auth);

  // console.log("user from redux service",user)
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const servicename = searchParams.get('servicename');
  const [service, setService] = useState(null);
  const [isStatus200, setIsStatus200] = useState(null);
  const [modal, setModal] = useState(true);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [box, setBox] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [useLastAddress, setUseLastAddress] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tempData, settempData] = useState({
    name: '', 
    mobile: '',
    email: '',
   
  });
  const [profileData, setProfileData] = useState({
    name: 'John Doe', // Replace with actual user data
    mobile: '123-456-7890',
    email: 'john.doe@example.com',
    address: '',
  });
  const [lastAddress, setLastAddress] = useState({
    city: '',
    state: '',
    pincode: ''
  });


  const formRef = useRef(null);

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
      settempData({
        name: name,
        mobile: mobile,
        email: email
      })

      // Handle form submission logic here
      // console.log({ name, mobile, email });
      setName("");
      setMobile("");
      setEmail("");
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
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("before",isLoggedIn)
  const[demodata,setdemodata]=useState(false);
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
        setdemodata(true)
        setIsLoggedIn(true);
        dispatch(loginSuccess(response.data));
        // console.log("after loggin",isLoggedIn)
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

  
  const handleMyProfileClick = () => {
    // Check if user is logged in (pseudo-code, replace with actual logic)
    const userLoggedIn = true;
    if (userLoggedIn) {
      setIsModalOpen(true);
    } else {
      alert('Please log in to view your profile.');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const HandleOtpChange = (e) => {
    setOtp(e.target.value);
    if (e.target.value.length < 4) {
      setErrorMessage('');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    
  };

  const handleBox = () => {
    setBox(!box);
  };

  useEffect(() => {
    if (servicename) {
      const storedServices = JSON.parse(localStorage.getItem("services"));
      const service = storedServices.find(service => service.name === servicename);
      setService(service);
    }
  }, [servicename]);

  useEffect(() => {
    if (isStatus200 && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isStatus200]);

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
        setModal(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access:', error.response.data);
        setIsStatus200(false);
        setModal(true);
      } else {
        console.error('Error retrieving service:', error);
        setIsStatus200(false);
      }
    }
  };
  const handleUseLastAddressChange = () => {
    setUseLastAddress(!useLastAddress);
    if (!useLastAddress) {
      // Fetch last address from your API or local storage if needed
      // Example of setting last address from localStorage:
      const storedAddress = JSON.parse(localStorage.getItem('lastAddress'));
      if (storedAddress) {
        setLastAddress(storedAddress);
      }
    } else {
      // Clear last address fields
      setLastAddress({
        city: '',
        state: '',
        pincode: ''
      });
    }
  };

  return (
    <>
      {/* <TempHeader /> */}
            <TempHeader onProfileClick={handleMyProfileClick} data={tempData} demodata={demodata}/>
      <div className="min-h-screen bg-gray-100  p-4">
        {/* <div className="bg-red-100 rounded-lg shadow-lg p-8 max-w-3xl w-full"> */}
          <div className="flex flex-col md:flex-row ">
           
           <Image src={Bike} className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0 md:mr-8"></Image>
            <div className="flex flex-col  p-9">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.name}</h1>
                <p className="text-lg mb-2"><strong>Category:</strong> {service.category}</p>
                <p className="text-lg mb-2"><strong>Price:</strong> {service.price}</p>
                <p className="text-lg mb-2"><strong>Address:</strong> {service.address}</p>
                <p className="text-lg mb-4"><strong>Location:</strong> {service.location.lat}, {service.location.lng}</p>
              </div>
              <div className="flex gap-8">
                <button
                  onClick={() => router.back()}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Go Back
                </button>
                <button
                  onClick={GetService}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                  Get Service
                </button>
              </div>
            </div>
          </div>
        </div>
   {/* </div> */}

      {isStatus200 && (
        <div ref={formRef} className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full mt-8 mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Fill Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  Name*
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
                  onChange={(e) => setMobile(e.target.value)}
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
                  id="email"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Email
                </label>
              </div>
            </div>
            {/* Checkbox for "Use last address" */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="useLastAddress"
                checked={useLastAddress}
                onChange={handleUseLastAddressChange}
                className="mr-2"
              />
              <label htmlFor="useLastAddress" className="text-sm text-gray-700">
                Use last address
              </label>
            </div>

            {/* Conditional rendering of address fields */}
            {!useLastAddress && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <div className="relative border rounded-md">
                  <input
                    type="text"
                    id="city"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={lastAddress.city}
                    onChange={(e) =>
                      setLastAddress({ ...lastAddress, city: e.target.value })
                    }
                  />
                  <label
                    htmlFor="city"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    City
                  </label>
                </div>
                <div className="relative border rounded-md">
                  <input
                    type="text"
                    id="state"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={lastAddress.state}
                    onChange={(e) =>
                      setLastAddress({ ...lastAddress, state: e.target.value })
                    }
                  />
                  <label
                    htmlFor="state"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    State
                  </label>
                </div>
                <div className="relative border rounded-md">
                  <input
                    type="text"
                    id="pincode"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={lastAddress.pincode}
                    onChange={(e) =>
                      setLastAddress({ ...lastAddress, pincode: e.target.value })
                    }
                  />
                  <label
                    htmlFor="pincode"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Pincode
                  </label>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="p-3 w-full bg-blue-500 rounded-md text-white"
            >
              Submit
            </button>
          </form>
        </div>
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
                  />
                </div>
                {errorMessage && <div className="text-sm text-red-500">{errorMessage}</div>}
              </div>
              <button
                onClick={handleLogin}
                className="p-3 w-full bg-blue-500 rounded-md text-white"
              >
                Proceed
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    Name*
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
                    onChange={(e) => setMobile(e.target.value)}
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
                    id="email"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Email
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
      <ProfileModal isOpen={isModalOpen} onClose={handleModalClose} data={tempData} />
      <Footer/>
    </>
  );
};

export default ServiceDetails;