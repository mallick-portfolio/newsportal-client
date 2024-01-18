"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import PostRow from "../components/news/PostRow";
import DeletePost from "../components/news/DeletePostModal";
import isAdmin from "@/app/lib/utils/isAdmin";

const News = () => {
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
                List of Posts
              </h4>
            </div>
            <Button color="danger">
              <Link href="/dashboard/news/create/">Add Post</Link>
            </Button>
          </div>
          <div className="my-8">
            <PostRow />
          </div>
        </CardBody>
      </Card>
      <DeletePost />
    </div>
  );
};

export default isAdmin(News);
