"use client";
import React from "react";
import isAuth from "../lib/utils/IsAuth";
import { Avatar, Breadcrumbs, Button, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { getUser } from "../lib/user/userData";
import { useSelector } from "react-redux";

const Dashboard = async () => {
  const { user } = useSelector((state) => state.global);
  console.log(user);

  return (
    <div>
      <Card>
        <CardBody>
          <div className="flex w-full justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-primary-500">
                Profile page
              </h4>
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                className="w-20 h-20 text-large"
              />
              <h2>
                {user?.first_name} {user?.last_name}
              </h2>
              <p>{user?.email}</p>
            </div>
            <Button color="danger">
              <Link href="/">Home</Link>
            </Button>
          </div>
          <div className="my-8">{/* <PostRow /> */}</div>
        </CardBody>
      </Card>
    </div>
  );
};

export default isAuth(Dashboard);
