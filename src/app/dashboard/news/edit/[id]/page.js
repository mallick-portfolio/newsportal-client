/* eslint-disable react-hooks/exhaustive-deps */
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
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import {
  useGetCategoriesQuery,
  useGetPostByIdQuery,
  useUpdatePostByIdMutation,
} from "@/app/store/api/newsApi";
import Loading from "@/app/loading";

import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
const NewsPage = () => {
  const router = useRouter();
  const [description, setDescription] = useState();

  const params = useParams();
  const { data: pData, isLoading: pLoading } = useGetPostByIdQuery(params?.id);

  const { data: cData, isLoading: cLoading } = useGetCategoriesQuery();

  useEffect(() => {
    if (pData && pData?.success) {
      setDescription(pData?.data?.description);
      // SetselectedCategory(new Set([pData?.data?.category?.id]));
    }
  }, [pData]);

  // Editor ref
  const initialValues = {
    title: pData?.data?.title,
    category: pData?.data?.category?.id,
  };

  // validation schema
  const validationSchema = yup.object({
    title: yup.string().required("Post title must required"),
    category: yup.number().optional(),
  });

  // api call
  const [handleUpdate, { data, isError, isLoading }] =
    useUpdatePostByIdMutation();

  useEffect(() => {
    if (data && data?.success) {
      router.push("/dashboard/news/");
    } else if (data && !data?.success) {
      toast.error(data?.message);
    }
  }, [data, router]);

  // submit handler
  const onSubmit = async (data) => {
    data["description"] = description;
    await handleUpdate({ id: params?.id, data });
  };

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });
  const { errors, values, handleChange, touched, handleSubmit, setFieldValue } =
    formik;

  if (cLoading || (pLoading && !pData)) {
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
                Edit post
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
            <div className="flex w-full flex-col  gap-4">
              <p className="text-danger-500">
                Current selected Category: {pData?.data?.category?.name}
              </p>
              <Select
                variant="bordered"
                value={values.category}
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
            <NewsEditor
              setDescription={setDescription}
              description={description}
            />
            {/* <div className="my-4">
              <h3>Upload feature image</h3>
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
            </div> */}
            <Button type="submit" color="success" className="text-white mt-5">
              Update
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewsPage;
