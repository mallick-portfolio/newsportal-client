"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/reducer/globalSlice";
import { useGetMeQuery } from "@/app/store/api/accountApi";

const isAuth = (Component) => {
  return function AuthComponent(props) {
    const { data, isLoading, isError } = useGetMeQuery();
    console.log("data f rom isua", data?.data);
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
          dispatch(setUser(data?.data));
        } else {
          dispatch(setUser({}));
          router.push("/account/login");
        }
      }
    }, [data, dispatch, router]);

    return <Component {...props} />;
  };
};

export default isAuth;
