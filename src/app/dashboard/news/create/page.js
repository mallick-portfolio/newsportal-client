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
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import {
  useAddPostMutation,
  useGetCategoriesQuery,
} from "@/app/store/api/newsApi";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "@/app/loading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import isAdmin from "@/app/lib/utils/isAdmin";
const NewsPage = () => {
  const router = useRouter();
  const inputFileRef = useRef();
  const [image, setImage] = useState("");
  const [isImage, setIsImage] = useState(true);

  const { data: cData, isLoading: cLoading } = useGetCategoriesQuery();
  // Editor ref
  const initialValues = {
    title: "",
    category: null,
    description: "",
  };

  // validation schema
  const validationSchema = yup.object({
    title: yup.string().required("Post title must required"),
    category: yup.number().required("Category is required"),
    description: yup.string().required("Description is required"),
  });

  // api call
  const [handleCreatePost, { data, isError, isLoading }] = useAddPostMutation();

  useEffect(() => {
    if (data && data?.success) {
      router.push("/dashboard/news/");
    } else if (data && !data?.success) {
      toast.error(data?.message);
    }
  }, [data, router]);

  // submit handler
  const onSubmit = async (data) => {
    // data["description"] = description;
    data["image_url"] = image;
    if (!image || image == "") {
      setIsImage(false);
    } else {
      await handleCreatePost(data);
    }
  };

  const onImageChangeCapture = async (e) => {
    const form = new FormData();
    const images = e.target.files;
    for (let i = 0; i < images.length; i++) {
      form.append("image", images[i]);
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/news/attachment/`,
      form,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
          "Content-Type": "multipart/form-data;",
        },
      }
    );
    if (res?.status === 200) {
      setImage(res?.data?.data?.image);
      setIsImage(true);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const { errors, values, handleChange, touched, handleSubmit, setFieldValue } =
    formik;

  if (cLoading) {
    return <Loading />;
  }

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
          <form
            onSubmit={handleSubmit}
            className="mt-4"
            enctype="multipart/form-data"
          >
            <div className="my-4">
              <Input
                value={values.title}
                variant="bordered"
                name="title"
                onChange={handleChange}
                isInvalid={errors.title && touched.title}
                type="text"
                color={errors.title && touched.title ? "danger" : "default"}
                label="Post title"
                placeholder="Enter your post title"
                errorMessage={`${
                  errors.title && touched.title ? errors.title : ""
                }`}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                value={values.category}
                variant="bordered"
                name="category"
                onChange={handleChange}
                isInvalid={errors.category && touched.category}
                type="text"
                color={
                  errors.category && touched.category ? "danger" : "default"
                }
                label="Post category"
                placeholder="Select post category"
                errorMessage={`${
                  errors.category && touched.category ? errors.category : ""
                }`}
                className=""
              >
                {cData?.data?.map((category) => (
                  <SelectItem key={category?.id} value={category?.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="my-5">
              <Textarea
                label="Description"
                placeholder="Enter your description"
                className=""
                value={values.description}
                variant="bordered"
                name="description"
                onChange={handleChange}
                isInvalid={errors.description && touched.description}
                type="text"
                color={
                  errors.description && touched.description
                    ? "danger"
                    : "default"
                }
                errorMessage={`${
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }`}
              />
            </div>
            {/* <NewsEditor
              setDescription={setDescription}
              description={description}
            /> */}
            <div className="my-4">
              <h3>Upload feature image</h3>
              <p className="text-danger-500 my-2">
                {!isImage && "Image must required"}
              </p>
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  width={50}
                  height={50}
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + image}
                  alt="uploaded image"
                />
              ) : (
                ""
              )}
              <input
                type="file"
                name="image"
                accept=".png, .jpeg"
                hidden
                ref={inputFileRef}
                onChange={(e) => onImageChangeCapture(e)}
              />
              <Button
                onClick={() => inputFileRef.current.click()}
                color="primary"
                className="text-white"
                endContent={<MdOutlineFileUpload />}
              >
                Upload
              </Button>
            </div>
            <Button
              type="submit"
              color="success"
              className="text-white"
              // endContent={<MdOutlineFileUpload />}
            >
              Save
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default isAdmin(NewsPage);
