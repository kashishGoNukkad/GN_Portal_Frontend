"use client";
import Image from "next/image";
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import logo from "../../../../public/assets/logo-dark.png";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { RiAdminFill } from "react-icons/ri";
import Modal from "../Components/Modal";
import svg from "../../../../public/Login.svg";
import { RiAdminLine } from "react-icons/ri";
import mobileSide from "../Components/mobileSide";
import { PiGreaterThanLight } from "react-icons/pi";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/Slices/authSlice'

const MobileSide = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64  bg-white text-black transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
    >
      <button
        className="absolute top-0 right-4 text-2xl"
        onClick={toggleSidebar}
      >
        &times;
      </button>
      <div className="py-4">
        {/* <h2 className="text-lg font-bold">Sidebar Menu</h2> */}
        <ul className="mt-4 space-y-2">
          <li className="flex justify-between border p-4 items-center">
            <a href="#" className="block ">
              Home
            </a>
            <PiGreaterThanLight className="size-4" />
          </li>
          <li>
            <a href="#" className="block">
              Pages
            </a>
          </li>
          <li>
            <a href="#" className="block">
              Profile
            </a>
          </li>
          <li>
            <a href="#" className="block">
              Job
            </a>
          </li>
          <li>
            <a href="#" className="block">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const TempHeader = ({ onProfileClick, data,demodata }) => {
 
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [phoneError, setPhoneError] = useState("");
  const [box, setBox] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookieValue, setCookieValue] = useState('')
  const [tempData, setTempData] = useState({
    name: "",
    mobile: "",
    email: ""
  });
  useEffect(()=>{
    if(demodata){
      setIsLoggedIn(true)
    }
  },[demodata])
  useEffect(() => {
    setCookieValue(data || '')
  }, [data]);

  

  console.log('MY DATA: ', data)


  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  useEffect(() => {
    const isNameValid = name.trim() !== "";
    const isPhoneValid = /^[0-9]{10}$/.test(mobile);
    const isEmailValid =
      email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setPhoneError(
      isPhoneValid ? "" : "Please enter a valid 10-digit phone number."
    );

    setIsButtonDisabled(!(isNameValid && isPhoneValid && isEmailValid));
  }, [name, mobile, email, email2]);


  // const handleData = () => {
  //   setTempData({
  //     name,
  //     mobile,
  //     email
  //   });
  // };

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

      setTempData({
        name: name,
        mobile: mobile,
        email: email
      })

        ;
      setName("");
      setmobile("");
      setEmail("");
      handleData();


    } catch (error) {
      console.log(error);
    }
  };
  const handlebox = () => {
    setBox(!box);
  };

  // const handleModalClose=()=>{
  //   setIsMod
  // }

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
      console.log("reposne", response)
      if (response.status === 200) {
        setIsLoggedIn(true);

        dispatch(loginSuccess(response.data));
        setIsOtpGenerated(false);
        setModal(false);
        setOtp("");
        setErrorMessage('');
        toast.success("Login success");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsLoggedIn(false);
        // dispatch(loginFailure(error.message));
        setErrorMessage("Invalid or expired OTP");

      } else {
        console.log("error", error);
      }
    }
  };
  const { user, sessionId, status } = useSelector((state) => state.auth);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {

        const response = await axios.get("http://localhost:3001/protected", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("no active session", error);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {

    try {
      const response = await axios.post(
        "http://localhost:3001/api2/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("redux data after logout:", user)
      dispatch({ type: 'RESET_STATE' });

      if (response.status === 200) {
        setIsLoggedIn(false);
        setBox(false);
      }
    } catch (error) {
      console.log("Logout failed", error);
    }
  };
  const HandleOtpChange = (e) => {
    setOtp(e.target.value);
    if (e.target.value.length < 4) {
      setErrorMessage('')
    }
  }

  return (
    <>
      <header className="relative">
        <div className="flex justify-between items-center p-6">
          <div className="flex justify-center items-center gap-16">
            <Image src={logo} alt="Picture of the author" />

            <div className="hidden md:flex items-center">
              <ul className="relative flex justify-center items-center">
                <li className="group tex-lg">
                  <a
                    href="#"
                    className="inline-block px-4 py-2 text-yellow-400"
                    onClick={() => toggleDropdown('home')}
                  >
                    Home
                  </a>
                  {openDropdown === 'home' && (
                    <div className="absolute left-0 mt-2 w-48 rounded shadow-lg bg-white transition-opacity duration-300">
                      <span className="hover:bg-red-300">
                        <a href="#">
                          <div className="block px-4 py-2 border-b-2">
                            Home 1
                          </div>
                        </a>
                      </span>
                      <a
                        href="#"
                        className="z-50 block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Home 2
                      </a>
                    </div>
                  )}
                </li>
                <li className="group">
                  <a href="#" className="inline-block px-4 py-2" onClick={() => toggleDropdown('pages')}>
                    Pages
                  </a>
                  {openDropdown === 'pages' && (
                    <div className="z-50 absolute left-24 mt-2 w-48 rounded shadow-lg bg-white transition-opacity duration-300">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 border-b-2"
                      >
                        Home 1
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Home 2
                      </a>
                    </div>
                  )}
                </li>
                <li className="group">
                  <a href="#" className="inline-block px-4 py-2" onClick={() => toggleDropdown('profile')}>
                    Profile
                  </a>
                  {openDropdown === 'profile' && (
                    <div className="z-50 absolute left-48 mt-2 w-48 rounded shadow-lg bg-white transition-opacity duration-300">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 border-b-2"
                      >
                        Home 1
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Home 2
                      </a>
                    </div>
                  )}
                </li>
                <li className="group">
                  <a href="#" className="inline-block px-4 py-2" onClick={() => toggleDropdown('job')}>
                    Job
                  </a>
                  {openDropdown === 'job' && (
                    <div className="z-50 absolute left-72 mt-2 w-48 rounded shadow-lg bg-white transition-opacity duration-300">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 border-b-2"
                      >
                        Home 1
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Home 2
                      </a>
                    </div>
                  )}
                </li>
                <li className="group">
                  <a href="#" className="inline-block px-4 py-2" onClick={() => toggleDropdown('contact')}>
                    Contact
                  </a>
                  {openDropdown === 'contact' && (
                    <div className="z-50 absolute left-86 mt-2 w-48 rounded shadow-lg bg-white transition-opacity duration-300">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 border-b-2"
                      >
                        Home 1
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Home 2
                      </a>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center gap-8">

            {(isLoggedIn || cookieValue.length > 0) ? (
              <div
                onClick={handlebox}
                className="relative size-30 cursor-pointer rounded-full px-4 py-4 bg-gray-300"
              >
                <FaUserAlt className="text-gray-400" />
                <div
                  className={`z-50 absolute w-36 ${box ? "block" : "hidden"
                    } top-10 px-4 py-2 bg-white right-12 border rounded-md border-gray-100 shadow-xl`}
                >
                  <ul className="text-sm flex flex-col gap-4">
                    <li className="cursor-pointer">
                      <a onClick={onProfileClick} >My Profile</a>
                    </li>
                    <li className="cursor-pointer">
                      <a href="#">Orders</a>
                    </li>
                    <li className="cursor-pointer" onClick={handleLogout}>
                      <a href="#">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setModal(true)}
                className="bg-yellow-400 rounded-lg flex justify-center items-center px-6 py-2 gap-2 text-center"
              >
                <RiAdminFill />
                <span>Login</span>
              </button>
            )}
          </div>
          {/* mobile sidebar menu */}

          <button
            className="md:hidden flex flex-col gap-1"
            onClick={toggleSidebar}
          >
            <div className="bg-black w-6 h-1"></div>
            <div className="bg-black w-6 h-1"></div>
            <div className="bg-black w-6 h-1"></div>
          </button>


        </div>
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
                    onChange={(e) => { setName(e.target.value) }}
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
                    onChange={(e) => { setmobile(e.target.value); }}
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
                    onChange={(e) => { setEmail(e.target.value) }}
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
        <mobileSide />
      </header>
      <MobileSide isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

    </>
  );
};

export default TempHeader;
