/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "../../../../public/images/fruit-1.jpeg";
import { getPosts } from "@/app/lib/post/postData";
import { getCategories } from "@/app/lib/category/categoryData";
import Link from "next/link";

const GalleryPost = () => {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState();
  const [categories, setCategories] = useState([]);
  const loadPost = async () => {
    const posts = await getPosts(`?category=${selected}`);
    const categories = await getCategories();
    setCategories(categories?.data);
    setPosts(posts?.data);
  };
  useEffect(() => {
    loadPost();
  }, [selected]);
  // loadPost();

  return (
    <div className="mx-auto flex justify-center flex-col items-center">
      <Tabs onSelectionChange={setSelected} aria-label="Options">
        {categories?.map((category) => (
          <Tab key={category?.slug} title={category?.name}>
            <div className="grid grid-cols-3 gap-4">
              {posts?.map((post) => (
                <div key={post?.id}>
                  <Card>
                    <CardBody>
                      <div className="flex flex-col gap-5 my-2">
                        <div className="">
                          <img
                            className="w-full rounded-md h-auto"
                            alt="NextUI Fruit Image with Zoom"
                            src={post?.image_url}
                          />
                        </div>
                        <p className="text-primary-500">
                          #{post?.category?.name}
                        </p>
                        <div className="">
                          <Link href={`/posts/${post?.id}`}>
                            <h3 className="text-lg font-semibold">
                              {post?.title}
                            </h3>
                          </Link>
                          <p>{post?.description?.slice(0, 100)}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default GalleryPost;
