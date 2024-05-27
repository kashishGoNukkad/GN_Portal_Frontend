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

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPasswordValidation, setShowPasswordValidation] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [verifyToken, setVerifyToken] = useState("");

    const validatePassword = (password) => {
        const capitalLetter = /^[A-Z]/;
        const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
        return capitalLetter.test(password) && specialCharacter.test(password);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onSignup = async () => {
        if (!validateEmail(user.email)) {
            setErrorMessage("Invalid email format");
            toast.error("Invalid email format");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage(""); // Clear previous error messages
            const response = await axios.post("http://localhost:3001/register", user, {
                withCredentials: true,
            });
            setUser({
                email: "",
                password: "",
                username: "",
            });
            toast.success(`You are registered successfully. Please check email at ${user.email} to verify.`);

            console.log("Signup success", response.data);
            // router.push("/login");
        } 
        catch (error) {
            console.log("Signup failed", error.message);

            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    useEffect(() => {
        setIsValidPassword(validatePassword(user.password));
    }, [user.password]);

    useEffect(() => {
        const fetchToken = () => {
            const token = Cookies.get('verifyToken');
            console.log('Verify Token:', token);
            setVerifyToken(token || ""); // Update state with the token
        };
        fetchToken();
    }, []);

    function passChange(e) {
        setUser({ ...user, password: e.target.value });
        setShowPasswordValidation(false);
    }

    return (
        <>
            <div className="w-full h-screen bg-[#3F3C4F] flex items-center justify-center">
                <div className="w-4/12 h-[90vh] flex flex-col bg-white rounded-lg">
                    <div className="w-full h-fit flex flex-col items-center justify-center">
                        <h3 className="text-xl font-semibold text-black pt-8 text-center leading-10">Welcome To <br /> <span className="text-[#2E4DA7] text-2xl">USER MANAGEMENT</span></h3>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <h1 className="pt-4 text-[#101831]">{loading ? "Processing" : "Signup"}</h1>
                        <div className="h-0.5 w-11/12 bg-orange-500 my-2"></div>
                    </div>
                    <Toaster position="top-right" reverseOrder={false} />

                    <div className="w-full h-fit flex flex-col items-center justify-center pt-4">
                        <div className="w-11/12 h-fit flex flex-col relative">
                            <input
                                className="w-full pt-2 px-2 h-16 block border-0 border-b-[1px] outline-none appearance-none focus:outline-none peer cursor-pointer"
                                id="username"
                                type="text"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                placeholder=" "
                            />
                            <label
                                className="text-[#2E4DA7] absolute top-0 left-2 scale-100 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transform-all duration-300 cursor-pointer"
                                htmlFor="username"
                            >
                                <div className="flex items-center justify-center gap-2"><FaUser />Username</div>
                            </label>
                        </div>
                    </div>
                    <div className="w-full h-fit flex flex-col items-center justify-center pt-4">
                        <div className="w-11/12 h-fit flex flex-col relative">
                            <input
                                className="w-full pt-2 pl-2 h-16 block border-0 border-b-[1px] outline-none appearance-none focus:outline-none peer cursor-pointer"
                                id="email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder=" "
                            />
                            <label
                                className="text-[#2E4DA7] absolute top-0 left-2 scale-100 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transform-all duration-300 cursor-pointer"
                                htmlFor="email"
                            >
                                <div className="flex items-center justify-center gap-2"><FaUser />Email</div>
                            </label>
                        </div>
                    </div>
                    <div className="w-full h-fit flex flex-col items-center justify-center pt-4">
                        <div className="w-11/12 h-fit flex flex-col relative">
                            <input
                                className="w-full pt-2 pl-2 h-16 block border-0 border-b-[1px] outline-none appearance-none focus:outline-none peer cursor-pointer"
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={passChange}
                                onFocus={() => setShowPasswordValidation(true)}
                                onBlur={() => setShowPasswordValidation(false)}
                                placeholder=" "
                            />
                            <label
                                className="text-[#2E4DA7] absolute top-0 left-2 scale-100 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transform-all duration-300 cursor-pointer"
                                htmlFor="password"
                            >
                                <div className="flex items-center justify-center gap-2"><RiLockPasswordFill />Password</div>
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
                            {!isValidPassword && user.password && (
                                <p className="text-red-500">Password does not meet the criteria</p>
                            )}
                        </div>
                    </div>
                    <div className="w-full h-fit flex items-center justify-center py-2">
                        <div className="w-11/12 h-fit flex items-center justify-center">
                            <button
                                onClick={onSignup}
                                disabled={buttonDisabled}
                                className="px-4 h-12 w-fit border text-white bg-[#2E4DA7] border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                            >
                                {buttonDisabled ? "Fill Details" : "Signup"}
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-fit flex items-center justify-center py-4">
                        <div className="w-11/12 h-fit flex items-center justify-center">
                            <p className="text-[15px]">Already have Account? <Link className="text-[#2E4DA7] font-semibold" href="/login">Login Now</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
