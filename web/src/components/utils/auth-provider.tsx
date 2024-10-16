import { createContext } from "preact";
import { useContext, useEffect, useLayoutEffect } from "preact/hooks";
import request from "../../api/request";
import { useGlobalSignal } from "../context/state.context";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

const user = useGlobalSignal<string | null>("user");

const AuthProvider = ({ children }) => {
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await request.get("/users/me");
        user.value = response.data;
      } catch (error) {
        user.value = null;
      }
    };
    fetchMe();
  }, []);
};

useLayoutEffect(() => {}, []);
