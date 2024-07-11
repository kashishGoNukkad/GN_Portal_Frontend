"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
// import {useUser}  from '../context/userContext'
import { useUser } from "../context/userContext";
import { AddRole, userId } from "../Redux/Slices/slice";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const router = useRouter();
 
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("");
  const [user_id, setuser_id] = useState("");
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
     
      setRole(response.data.Role);
      setuser_id(response.data._id);

      if (response.data.login) {
        toast.success("Login success");

        // router.push("/admindashboard");
        router.push("/home");
      } else {
        toast.error("Verify Your email first!");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const userDispatch = () => {
    dispatch(AddRole(role));
    // dispatch(userId(user_id))
  };
  const userDispatch2 = () => {
    // dispatch(AddRole(role))
    dispatch(userId(user_id));
  };

  useEffect(() => {
    userDispatch();
  }, [role]);
  useEffect(() => {
    userDispatch2();
  }, [user_id]);

  const onForgot = async () => {
    try {
      const response = await axios.post("http://localhost:3001/forgetmail", {
        email,
      });
      console.log(response.data);
      toast.success(`Visit ${email} to reset your password`);
    } catch (error) {
      console.error("Error sending forgot password email", error);
      toast.error("Please input email to forget password!");
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-[#3F3C4F] flex items-center justify-center">
        <div className="w-4/12 h-[82vh] flex flex-col bg-white rounded-lg">
          <div className="w-full h-fit flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-black pt-8 text-center leading-10">
              Welcome To <br />{" "}
              <span className="text-[#2E4DA7] text-2xl">USER MANAGEMENT</span>
            </h3>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <p className="pt-4 text-[#101831]">Log in to your account</p>
            <div className="h-0.5 w-11/12 bg-orange-500 my-2"></div>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="w-full h-fit flex flex-col items-center justify-center pt-4">
            <div className="w-11/12 h-fit flex flex-col relative">
              <input
                className="w-full pt-2  px-2 h-16 block border-0 border-b-[1px] outline-none appearance-none focus:outline-none peer cursor-pointer"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
              />
              <label
                className="text-[#2E4DA7] absolute top-0 left-2 scale-100 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transform-all duration-300 cursor-pointer"
                htmlFor="email"
              >
                <div className="flex items-center justify-center gap-2">
                  <MdEmail />
                  Email
                </div>
              </label>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col items-center justify-center pt-4">
            <div className="w-11/12 h-fit flex flex-col relative">
              <input
                className="w-full pt-2  pl-2 h-16 block border-0 border-b-[1px] outline-none appearance-none focus:outline-none peer cursor-pointer"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                autoComplete="off"
              />
              <label
                className="text-[#2E4DA7] absolute top-0 left-2 scale-100 peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transform-all duration-300 cursor-pointer"
                htmlFor="password"
              >
                <div className="flex items-center justify-center gap-2">
                  <RiLockPasswordFill />
                  Password
                </div>
              </label>
            </div>
          </div>
          <div className="w-full h-fit flex items-center justify-center py-2">
            <div className="w-11/12 h-fit flex items-end justify-end ">
              <p
                className="text-sm text-orange-500 cursor-pointer"
                onClick={onForgot}
              >
                Forgot Password?
              </p>
            </div>
          </div>
          <div className="w-full h-fit flex items-center justify-center  py-2">
            <div className="w-11/12 h-fit flex items-center justify-center">
              <button
                onClick={onLogin}
                disabled={loading}
                className="px-4  h-12 w-fit border text-white bg-[#2E4DA7] border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
              >
                {loading ? "Logging in..." : "Submit"}
              </button>
            </div>
          </div>
          <div className="w-full h-fit flex items-center justify-center py-4">
            <div className="w-11/12 h-fit flex items-center justify-center">
              <p className="text-[15px">
                Don't Have Account?{" "}
                <Link className="text-[#2E4DA7] font-semibold" href="/signup">
                  Sign Up.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
