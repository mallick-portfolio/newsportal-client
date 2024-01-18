"use client";
import Loading from "@/app/loading";
import { useGetCategoriesQuery } from "@/app/store/api/newsApi";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import React from "react";
import CategoryRow from "../components/category/CategoryRow";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import CreateCategory from "../components/category/CreateCategory";
import { setShowCreateCategoryModal } from "@/app/store/reducer/dashboardSlice";
import isAdmin from "@/app/lib/utils/isAdmin";

const Category = () => {
  const dispatch = useDispatch();

  return (
    <div className="pr-6 ">
      <Card>
        <CardBody>
          <Breadcrumbs variant="solid">
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Category</BreadcrumbItem>
          </Breadcrumbs>
          <div className="flex w-full justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-primary-500">
                List of Category
              </h4>
            </div>
            <div>
              <Button
                onClick={() => dispatch(setShowCreateCategoryModal(true))}
                endContent={<FaPlus />}
                color="danger"
              >
                Add Category
              </Button>
            </div>
          </div>
          <div className="my-8">
            <CategoryRow />
          </div>
        </CardBody>
      </Card>
      {/* modal components */}
      {<CreateCategory />}
    </div>
  );
};

export default isAdmin(Category);
