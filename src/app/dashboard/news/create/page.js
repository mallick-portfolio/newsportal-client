"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import NewsEditor from "@/app/components/editor/NewsEditor";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
const NewsPage = () => {
  // Editor ref
  const [value, setValue] = useState("");
  const initialValues = {
    title: "",
    description: "",
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

  // submit handler
  const onSubmit = async (values) => {
    console.log(values);
    await handleLogin(values);
  };

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const { errors, values, handleChange, touched, handleSubmit } = formik;

  // Editor ref
  return (
    <div className="pr-6 ">
      <Card>
        <CardBody>
          <Breadcrumbs variant="solid">
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>News</BreadcrumbItem>
            <BreadcrumbItem>Create</BreadcrumbItem>
          </Breadcrumbs>
          <div className="flex w-full justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-primary-500">
                Create new post
              </h4>
            </div>
            <div>
              <Button color="danger">Submit</Button>
            </div>
          </div>
          <div className="mt-4">
            <div className="my-4">
              <Input
                name="title"
                onChange={handleChange}
                value={values.title}
                variant="bordered"
                type="text"
                label="Post title"
                placeholder="Enter your post title"
              />
            </div>
            <NewsEditor />
            <div className="my-4">
              <h3>Upload feature image</h3>
              <Button
                color="primary"
                className="text-white"
                endContent={<MdOutlineFileUpload />}
              >
                Take a photo
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewsPage;
