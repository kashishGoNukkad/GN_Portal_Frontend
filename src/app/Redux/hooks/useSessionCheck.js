
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { loginSuccess, logout } from "../Slices/authSlice";

export function useSessionCheck() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log("auth",auth)
  useEffect(() => {
    const checksession = async () => {
      if (!auth.sessionId) {
        try {
            const response = await axios.get('http://localhost:3001/checksession', {
                withCredentials: true,
              });

          if (response.data.sessionId) {
            dispatch(loginSuccess(response.data));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.error("Session check failed:", error);
          dispatch(logout());
        }
      }
    };
    checksession()
  },[dispatch,auth.sessionId]);
}
