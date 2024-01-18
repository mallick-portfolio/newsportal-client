import Image from "next/image";
import Header from "./components/shared/Header";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Tab,
  Tabs,
} from "@nextui-org/react";
import img1 from "../../public/images/fruit-1.jpeg";
import SidebarPosts from "./components/home/SidebarPosts";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container my-12">
        <div className="flex flex-row gap-6">
          <div className="w-3/5">
            <Card>
              <CardBody>
                <div className="flex justify-center">
                  <Image
                    isZoomed
                    className="w-full"
                    alt="NextUI Fruit Image with Zoom"
                    src={img1}
                  />
                </div>
                <h1 className="text-4xl my-5 font-semibold">
                  Make beautiful websites regardless of your design experience.
                </h1>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
            </Card>
          </div>
          <div className="flex w-2/5 flex-col">
            <SidebarPosts />
          </div>
        </div>
      </div>
    </>
  );
}
