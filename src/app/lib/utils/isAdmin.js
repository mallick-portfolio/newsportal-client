"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/reducer/globalSlice";
import { useGetMeQuery } from "@/app/store/api/accountApi";

const isAdmin = (Component) => {
  return function AuthComponent(props) {
    const { data, isLoading, isError } = useGetMeQuery();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      if (
        Cookies.get("auth_token") == null ||
        Cookies.get("auth_token") == undefined
      ) {
        router.push("/");
      }
      if (data && data?.success) {
        if (
          (data && !data?.success) ||
          Cookies.get("auth_token") == undefined
        ) {
          router.push("/");
        } else if (data && data?.success) {
          if (data?.data?.status === "admin") {
            dispatch(setUser(data?.data));
          } else {
            dispatch(setUser({}));
            router.push("/dashboard/profile/");
          }
        } else {
          dispatch(setUser({}));
          router.push("/account/login");
        }
      }
    }, [data, dispatch, router]);

    return <Component {...props} />;
  };
};

export default isAdmin;
