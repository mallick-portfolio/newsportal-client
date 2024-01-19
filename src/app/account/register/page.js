"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useUserRegisterMutation } from "@/app/store/api/accountApi";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Register = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { user } = useSelector((state) => state.global);

  // initial values
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
    gender: "male",
  };

  // validation schema
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Firstname is required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Lastname is required"),
    email: Yup.string().email().required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
    password2: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Confirm password not match with password"
      )
      .min(6, "Confirm password is too short - should be 6 chars minimum"),
    gender: Yup.string().required("Gender is required"),
  });

  // api call
  const [handleFormSubmit, { data, isLoading, isError }] =
    useUserRegisterMutation();

  // api response
  useEffect(() => {
    if (data && data?.success) {
      toast.success(data?.message);
      router.push("/account/login");
    } else if (data && !data?.success) {
      toast.error(data?.message);
    }
  }, [data, router]);

  // submit button handler
  const onSubmit = async (values) => {
    await handleFormSubmit(values);
  };

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const { errors, values, handleChange, touched, handleSubmit } = formik;
  if (user?.id && Cookies.get("auth_token")) {
    redirect("/dashboard");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center h-auto mt-10 ">
        <Card className="py-4 w-[400px]">
          <CardHeader className="pb-0 pt-2 px-4 justify-center ">
            <h4 className="font-bold text-2xl text-center">Register</h4>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="overflow-visible flex gap-y-2 flex-col py-6">
              <Input
                value={values.first_name}
                variant="bordered"
                name="first_name"
                onChange={handleChange}
                size="sm"
                isInvalid={errors.first_name && touched.first_name}
                type="text"
                color={
                  errors.first_name && touched.first_name ? "danger" : "default"
                }
                label="First Name"
                className="max-w-lg"
                errorMessage={`${
                  errors.first_name && touched.first_name
                    ? errors.first_name
                    : ""
                }`}
              />
              <Input
                value={values.last_name}
                variant="bordered"
                name="last_name"
                onChange={handleChange}
                size="sm"
                isInvalid={errors.last_name && touched.last_name}
                type="text"
                color={
                  errors.last_name && touched.last_name ? "danger" : "default"
                }
                label="Last Name"
                className="max-w-lg"
                errorMessage={`${
                  errors.last_name && touched.last_name ? errors.last_name : ""
                }`}
              />
              <Input
                value={values.username}
                variant="bordered"
                name="username"
                onChange={handleChange}
                size="sm"
                isInvalid={errors.username && touched.username}
                type="text"
                color={
                  errors.username && touched.username ? "danger" : "default"
                }
                label="User Name"
                className="max-w-lg"
                errorMessage={`${
                  errors.username && touched.username ? errors.username : ""
                }`}
              />
              <Input
                value={values.email}
                variant="bordered"
                name="email"
                onChange={handleChange}
                size="sm"
                isInvalid={errors.email && touched.email}
                type="email"
                color={errors.email && touched.email ? "danger" : "default"}
                label="Email"
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
                size="sm"
                isInvalid={errors.password && touched.password}
                color={
                  errors.password && touched.password ? "danger" : "default"
                }
                label="Password"
                className="max-w-lg"
                errorMessage={`${
                  errors.password && touched.password ? errors.password : ""
                }`}
                endContent={
                  <button
                    className="focus:outline-none -mt-8"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaRegEye className="text-xl  text-default-400 pointer-events-none" />
                    ) : (
                      <FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              <Input
                value={values.password2}
                variant="bordered"
                name="password2"
                onChange={handleChange}
                isInvalid={errors.password2 && touched.password2}
                size="sm"
                endContent={
                  <button
                    className="focus:outline-none -mt-8"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaRegEye className="text-xl  text-default-400 pointer-events-none" />
                    ) : (
                      <FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                color={
                  errors.password2 && touched.password2 ? "danger" : "default"
                }
                label="Password2"
                className="max-w-lg"
                errorMessage={`${
                  errors.password2 && touched.password2 ? errors.password2 : ""
                }`}
              />
              <Select
                value={values.gender}
                variant="bordered"
                name="gender"
                onChange={handleChange}
                size="sm"
                color="default"
                label="Select gender"
                className="max-w-lg"
              >
                <SelectItem key={"male"} value="male">
                  Male
                </SelectItem>
                <SelectItem key={"female"} value="female">
                  Female
                </SelectItem>
                <SelectItem key={"other"} value="other">
                  Other
                </SelectItem>
              </Select>

              <Button type="submit" isLoading={isLoading} color="primary">
                Submit
              </Button>
              <div>
                Already have and account.{" "}
                <Link className="text-primary-500" href={"/account/login"}>
                  Login
                </Link>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
