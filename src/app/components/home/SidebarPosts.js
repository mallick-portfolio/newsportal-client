"use client";
import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import img1 from "../../../../public/images/fruit-1.jpeg";

const SidebarPosts = () => {
  return (
    <Tabs aria-label="Options">
      <Tab key="photos" title="Photos">
        <Card>
          <CardBody>
            <div className="flex gap-5">
              <div>
                <Image
                  isZoomed
                  className="w-full"
                  alt="NextUI Fruit Image with Zoom"
                  src={img1}
                />
              </div>
              <div>
                <Chip radius="md" color="primary" size="sm">
                  Chip
                </Chip>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Tab>
      <Tab key="music" title="Music">
        <Card>
          <CardBody>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </CardBody>
        </Card>
      </Tab>
      <Tab key="videos" title="Videos">
        <Card>
          <CardBody>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
};

export default SidebarPosts;
