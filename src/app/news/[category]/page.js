import Footer from "@/app/components/shared/Footer";
import Header from "@/app/components/shared/Header";
import { getPosts } from "@/app/lib/post/postData";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsByCategory = async ({ params }) => {
  const data = await getPosts(`?category=${params?.category}`);
  const posts = data?.data;
  return (
    <div>
      <Header />
      <div className="container mt-12">
        <div className="grid grid-cols-3 gap-4">
          {posts?.map((post) => (
            <div key={post?.id}>
              <Card>
                <CardBody>
                  <div className="flex flex-col gap-5 my-2">
                    <div className="">
                      <Image
                        className="w-full rounded-md"
                        width={200}
                        height={150}
                        alt="NextUI Fruit Image with Zoom"
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL + post?.image_url
                        }
                      />
                    </div>
                    <p className="text-primary-500">#{post?.category?.name}</p>
                    <div className="">
                      <Link href={`/posts/${post?.id}`}>
                        <h3 className="text-lg font-semibold">{post?.title}</h3>
                      </Link>
                      <p>{post?.description?.slice(0, 100)}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsByCategory;
