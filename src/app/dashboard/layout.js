"use client";
import {
  Avatar,
  Card,
  CardBody,
  Divider,
  Listbox,
  ListboxItem,
  Tooltip,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
import ReduxProvider from "../store/ReduxProvider";

const DashboardLayout = ({ children }) => {
  const pathName = usePathname();
  const allPath = pathName.split("/");
  const currentPath = allPath[allPath.length - 1];
  const menus = [
    { id: 0, title: "Category", url: "/dashboard/category" },
    { id: 1, title: "News", url: "/dashboard/news" },
    { id: 2, title: "Users", url: "/dashboard/category" },
  ];
  return (
    <ReduxProvider>
      <div className="flex gap-8">
        <Card className="h-screen w-2/12 top-0 left-0">
          <CardBody>
            <div className="text-center">
              <Avatar
                isBordered={true}
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                className="w-20 h-20 text-large mx-auto"
              />
              <h4 className="text-xl font-semibold ">Tamal Mallick</h4>
              <p className="">tamal@gmail.com</p>
            </div>
            <Divider className="my-4" />
            <div>
              <Listbox>
                {menus.map((menu) => (
                  <ListboxItem
                    href={menu.url}
                    key={menu.id}
                    color="danger"
                    className={`${
                      pathName.includes(menu.title.toLocaleLowerCase())
                        ? "bg-[#f31260] text-white"
                        : ""
                    }`}
                  >
                    <Tooltip
                      placement="right-end"
                      showArrow={true}
                      content="I am a tooltip"
                    >
                      <p>{menu.title}</p>
                    </Tooltip>
                  </ListboxItem>
                ))}
              </Listbox>
            </div>
          </CardBody>
        </Card>
        <div className="w-10/12 max-h-screen overflow-y-scroll">{children}</div>
      </div>
    </ReduxProvider>
  );
};

export default DashboardLayout;
