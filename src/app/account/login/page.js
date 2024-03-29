"use client";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useUserLoginMutation } from "@/app/store/api/accountApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.global);

  // initial values
  const initialValues = {
    email: "",
    password: "",
  };

  // validation schema
  const validationSchema = yup.object({
    email: yup
      .string()
      .nullable()
      .email("Must be a valid email")
      .required("Email must required"),
    password: yup.string().required("Password must required"),
  });

  // login api call
  const [handleLogin, { data, isLoading }] = useUserLoginMutation();

  // api response
  useEffect(() => {
    if (data && data?.success) {
      Cookies.set("auth_token", data?.token?.access);
      toast.success(data?.message, {
        autoClose: 2000,
        position: "bottom-right",
      });
      router.push("/dashboard");
    } else if (data && data?.error) {
      toast.error(data?.message);
    }
  }, [data, router]);

  // submit handler
  const onSubmit = async (values) => {
    await handleLogin(values);
  };

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const { errors, values, handleChange, touched, handleSubmit } = formik;
  if (user?.id && Cookies.get("auth_token")) {
    router.push("/dashboard");
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center h-auto mt-10 ">
        <Card className="py-4 w-[400px]">
          <CardHeader className="pb-0 pt-2 px-4 justify-center ">
            <h4 className="font-bold text-2xl text-center">Login</h4>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="overflow-visible flex gap-y-4 flex-col py-6">
              <Input
                onChange={handleChange}
                type="email"
                color={errors.email && touched.email ? "danger" : "default"}
                isInvalid={errors.email && touched.email}
                label="Email"
                name="email"
                value={values.email}
                variant="bordered"
                className="max-w-lg"
                errorMessage={`${
                  errors.email && touched.email ? errors.email : ""
                }`}
              />

              <Input
                value={values.password}
                variant="bordered"
                name="password"
                onChange={handleChange}
                isInvalid={errors.password && touched.password}
                type="password"
                color={
                  errors.password && touched.password ? "danger" : "default"
                }
                label="Password"
                className="max-w-lg"
                errorMessage={`${
                  errors.password && touched.password ? errors.password : ""
                }`}
              />

              <Button type="submit" isLoading={isLoading} color="primary">
                Submit
              </Button>
              <div>
                Don`t have an accout.{" "}
                <Link className="text-primary-500" href={"/account/register"}>
                  Register
                </Link>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
