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
        </CardBody>
      </Card>
    </div>
  );
};

export default News;
