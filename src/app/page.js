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
                    <Image
                      width={500}
                      height={200}
                      // className="w-full h-full"
                      quality={70}
                      priority={true}
                      placeholder="empty"
                      alt="NextUI Fruit Image with Zoom"
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        posts?.[0]?.image_url
                      }
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
      </div>
    </>
  );
}
