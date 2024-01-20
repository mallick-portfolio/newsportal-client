/* eslint-disable @next/next/no-img-element */
"use client";
import Loading from "@/app/loading";
import { useGetPostByIdQuery } from "@/app/store/api/newsApi";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const PostDetails = () => {
  const params = useParams();
  const { data, isLoading } = useGetPostByIdQuery(params?.id);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {" "}
      <Card>
        <CardBody>
          <Breadcrumbs variant="solid">
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Post</BreadcrumbItem>
            <BreadcrumbItem>Details</BreadcrumbItem>
          </Breadcrumbs>
          <div className="flex w-full justify-between items-center">
            <div>
              {/* <h4 className="text-lg font-semibold text-primary-500">
                List of Posts
              </h4> */}
            </div>
            <Button color="danger">
              <Link href="/dashboard/news/">Back</Link>
            </Button>
          </div>
          <div className="my-8">
            <img
              className="w-full h-full"
              alt="Post details"
              src={data?.data?.image_url}
            />
            <h2 className="text-3xl font-semibold my-5">{data?.data?.title}</h2>
            <div>{data?.data?.description}</div>
            {/* <div
              dangerouslySetInnerHTML={{ __html: data?.data?.description }}
            ></div> */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PostDetails;
