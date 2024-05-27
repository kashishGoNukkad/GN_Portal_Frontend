'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';
import { RiLockPasswordFill } from "react-icons/ri";

export default function SignUp() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [showPasswordValidation, setShowPasswordValidation] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [show, setShow] = useState(false);

    const validatePassword = (password) => {
        const capitalLetter = /^[A-Z]/;
        const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
        return capitalLetter.test(password) && specialCharacter.test(password);
    };

    useEffect(() => {
        const checkEmail = async () => {
          try {
            const response = await axios.post('http://localhost:3001/forgetmailcheck', { email });
            console.log(response);

            if (response.data.success === true) {
              setShow(true);
            } else {
              setShow(false);
            }
          } catch (error) {
            console.error('Error checking email:', error);
          }
        };
        checkEmail();  
    },[email] );

    const onReset = async () => {
        if (newpassword === confirmpassword) {
            try {
                const response = await axios.put('http://localhost:3001/forgetpass', { email, newpassword });
                console.log(response);
                toast.success("Password Reset Successfully!");
                setEmail("");
                setNewPassword("");
                setConfirmPassword("");
                // router.push("/login");
            } catch (error) {
                console.log("Password Reset Failed", error.message);
                toast.error(error.message);
            }
        } else {
            setError("Password is not matching!");
        }
    };

    useEffect(() => {
        const urlEmail = window.location.search.split("=")[1];
        setEmail(urlEmail || "");
    }, []);
   
    useEffect(() => {
        setIsValidPassword(validatePassword(newpassword));
    }, [newpassword]);

    function passChange(e) {
        setNewPassword( e.target.value );
        setShowPasswordValidation(false);
    }

    return (
        <>
            <div className="w-full h-screen bg-[#3F3C4F] flex items-center justify-center">
            {show ? (
                <div className="w-4/12 h-fit flex flex-col bg-white rounded-lg">
                <div className="w-full h-fit flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-black pt-8 text-center leading-10">Welcome To <br /> <span className="text-[#2E4DA7] text-2xl">USER MANAGEMENT</span></h3>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <p className="pt-4 text-[#101831]">Reset Your Password</p>
                    <div className="h-0.5 w-11/12 bg-orange-500 my-2"></div>
                </div>
                <Toaster position="top-right" reverseOrder={false} />
                <div className="w-full h-fit flex flex-col items-center justify-center pt-4">
                    <div className="w-11/12 h-fit flex flex-col relative">
                        <input
                            className="w-full pt-2 pl-2 h-16 block border-0 border-b-[1px] outline-none appearance-none focus:outline-none peer cursor-pointer"
                            id="newpassword"
                            type="password"
                            value={newpassword}
                            onChange={passChange}
                            onFocus={() => setShowPasswordValidation(true)}
                            onBlur={() => setShowPasswordValidation(false)}
                            placeholder=" "
                        />
                        <label
                            className="text-[#2E4DA7] absolute top-0 left-2 scale-100 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transform-all duration-300 cursor-pointer"
                            htmlFor="newpassword"
                        >
                            <div className="flex items-center justify-center gap-2"><RiLockPasswordFill />New Password</div>
                        </label>
                        {showPasswordValidation && (
                            <div className="text-white bg-gray-800 p-2 rounded mt-2">
                                <p>Password must:</p>
                                <ul className="list-disc pl-5">
                                    <li>Start with a capital letter</li>
                                    <li>Contain at least one special character (!@#$%^&*(),.?":{}|&lt;&gt;)</li>
                                </ul>
                            </div>
                        )}
                        {!isValidPassword && newpassword && (
                            <p className="text-red-500">Password does not meet the criteria</p>
                        )}
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col items-center justify-center pt-4">
                    <div className="w-11/12 h-fit flex flex-col relative">
                        <input
                            className="w-full pt-2 pl-2 h-16 block border-0 border-b-[1px] outline-none appearance-none focus:outline-none peer cursor-pointer"
                            id="confirmpassword"
                            type="password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder=" "
                        />
                        <label
                            className="text-[#2E4DA7] absolute top-0 left-2 scale-100 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transform-all duration-300 cursor-pointer"
                            htmlFor="confirmpassword"
                        >
                            <div className="flex items-center justify-center gap-2"><RiLockPasswordFill />Confirm Password</div>
                        </label>
                    </div>
                </div>
                <div className="w-full h-fit flex items-center justify-center pt-6">
                    <div className="w-11/12 h-fit flex items-center justify-center">
                        <button
                            onClick={onReset}
                            className="px-4 h-12 w-fit border text-white bg-[#2E4DA7] border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                        >
                           Reset
                        </button>
                    </div>
                </div>
                <div className="w-full h-fit flex items-center justify-center py-4">
                    <div className="w-11/12 h-fit flex items-center justify-center">
                        <p className="text-[15px] text-[#2E4DA7] font-semibold"><Link className="" href="/login">Go Back To Login.</Link></p>
                    </div>
                </div>
            </div>
            ) : (
                <div>
                    <h2 className="text-4xl text-red-900 font-bold">Mail has expired....</h2>
                </div>
            )}
            </div>
        </>
    )
}
eer