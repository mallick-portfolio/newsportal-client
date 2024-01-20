/* eslint-disable @next/next/no-img-element */
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
import { getPosts } from "./lib/post/postData";
import Link from "next/link";
import GalleryPost from "./components/home/GalleryPost";
import Footer from "./components/shared/Footer";

export default async function Home() {
  const data = await getPosts();
  const posts = data?.data;

  return (
    <>
      <Header />
      <div className="container my-12">
        <div className="flex flex-row gap-6">
          <div className="w-3/5">
            <Card>
              <CardBody>
                <div className="flex justify-center">
                  {posts?.[0]?.image_url ? (
                    <img
                      className="w-full h-full"
                      alt="NextUI Fruit Image with Zoom"
                      src={posts?.[0]?.image_url}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <h1 className="text-4xl my-5 font-semibold">
                  <Link href={`/posts/${posts?.[0]?.id}`}>
                    {posts?.[0]?.title}
                  </Link>
                </h1>
                <div className="">
                  {posts?.[0]?.description?.slice(0, 100)}...
                </div>
                {/* <div
                  className="mt-5"
                  dangerouslySetInnerHTML={{ __html: posts?.[0]?.description }}
                ></div> */}
              </CardBody>
            </Card>
          </div>
          <div className="flex w-2/5 flex-col">
            <SidebarPosts />
          </div>
        </div>
        <h4 className="text-center text-2xl font-semibold my-12">
          Post by category
        </h4>
        <GalleryPost />
      </div>
      <Footer />
    </>
  );
}
