"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/assets/logo-dark.png";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { RiAdminFill } from "react-icons/ri";
import Modal from "../Components/Modal";
import svg from "../../../../public/Login.svg";
import { RiAdminLine } from "react-icons/ri";
import mobileSide from "../Components/mobileSide"
import { PiGreaterThanLight } from "react-icons/pi";

const MobileSide = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64  bg-white text-black transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
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
            <a href="#" className="block ">Home</a>
            <PiGreaterThanLight className="size-4" />
            </li>
          <li><a href="#" className="block">Pages</a></li>
          <li><a href="#" className="block">Profile</a></li>
          <li><a href="#" className="block">Job</a></li>
          <li><a href="#" className="block">Contact</a></li>
        </ul>
      </div>
    </div>
  );
};




const TempHeader = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [phoneError, setPhoneError] = useState('');
  const [box, setBox] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };





  useEffect(() => {
    const isNameValid = name.trim() !== '';
    const isPhoneValid = /^[0-9]{10}$/.test(phone);
    const isEmailValid = email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setPhoneError(isPhoneValid ? '' : 'Please enter a valid 10-digit phone number.');
    console.log(phoneError)
    setIsButtonDisabled(!(isNameValid && isPhoneValid && isEmailValid));
  }, [name, phone, email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const isNameValid = name.trim() !== '';
      const isPhoneValid = /^[0-9]{10}$/.test(phone);
      const isEmailValid = email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      setPhoneError(isPhoneValid ? '' : 'Please enter a valid 10-digit phone number.');
      console.log(phoneError)
      setIsButtonDisabled(!(isNameValid && isPhoneValid && isEmailValid));

      if (!isNameValid || !isPhoneValid || !isEmailValid) {
        // If the form is invalid, do not proceed
        return;
      }

      setModal(false);
      // Handle form submission logic here
      console.log({ name, phone, email });
      setName('');
      setPhone('');
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };
  const handlebox = () => {
    setBox(!box)
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
                  <a href="#" className="inline-block px-4 py-2 text-yellow-400">Home</a>
                  <div className="absolute left-0 mt-2 w-48 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="hover:bg-red-300">
                      <a href="#"><div className="block px-4 py-2  border-b-2">Home 1</div></a>
                    </span>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home 2</a>
                  </div>
                </li>
                <li className="group">
                  <a href="#" className="inline-block  px-4 py-2">Pages</a>
                  <div className="absolute left-24 mt-2 w-48 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="block px-4 py-2 text-gray-800 border-b-2">Home 1</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home 2</a>
                  </div>
                </li>
                <li className="group">
                  <a href="#" className="inline-block px-4 py-2">Profile</a>
                  <div className="absolute left-48 mt-2 w-48 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="block px-4 py-2 text-gray-800 border-b-2">Home 1</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home 2</a>
                  </div>
                </li>
                <li className="group">
                  <a href="#" className="inline-block px-4 py-2">Job</a>
                  <div className="absolute left-72 mt-2 w-48 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="block px-4 py-2 text-gray-800 border-b-2">Home 1</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home 2</a>
                  </div>
                </li>
                <li className="group">
                  <a href="#" className="inline-block px-4 py-2">Contact</a>
                  <div className="absolute left-86 mt-2 w-48 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="block px-4 py-2 text-gray-800 border-b-2">Home 1</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home 2</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center gap-8">
            {
              1 ? (<button
                onClick={() => setModal(true)}
                className="bg-yellow-400 rounded-lg flex justify-center items-center px-6 py-2 gap-2 text-center"
              >
                <RiAdminFill />
                <span>login</span>
              </button>) : (
                <>
                  <div onClick={handlebox} className="relative  size-30 cursor-pointer rounded-full px-4 py-4 bg-gray-300">
                    <FaUserAlt className="text-gray-400" />
                  </div>
                </>
              )
            }

          </div>
          <button className="md:hidden flex flex-col gap-1" onClick={toggleSidebar}>
            <div className="bg-black w-6 h-1"></div>
            <div className="bg-black w-6 h-1"></div>
            <div className="bg-black w-6 h-1"></div>
          </button>

{/* mobile sidebar menu */}

{/* mobile sidebar menu */}





          {/* logout box */}
          <div className={`absolute w-36 ${box?"block":"hidden"} top-20  px-4 py-2 right-16 border rounded-md border-gray-100 shadow-xl`}>

            <ul className="text-sm flex flex-col gap-4">

              <li className="cursor-pointer"><a href=""></a>Orders</li>
              <li className="cursor-pointer"><a href=""></a>logout</li>
            </ul>

          </div>
        </div>
        <Modal
          Isvisible={modal}
          onclose={() => setModal(false)}
        >
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
                  id="Phone"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label
                  htmlFor="Phone"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Phone*
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
              disabled={isButtonDisabled}
              className="p-3 w-full bg-blue-500 rounded-md text-white"
            >
              Proceed
            </button>
          </form>
        </Modal>
        <mobileSide />
      </header>
      <MobileSide isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default TempHeader;
