/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "../../../../public/images/fruit-1.jpeg";
import { getPosts } from "@/app/lib/post/postData";
import { getCategories } from "@/app/lib/category/categoryData";
import Link from "next/link";

const SidebarPosts = () => {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState();
  const [categories, setCategories] = useState([]);
  const loadPost = async () => {
    const posts = await getPosts(`?category=${selected}`);
    const categories = await getCategories();
    setCategories(categories?.data?.slice(0, 4));
    setPosts(posts?.data);
  };
  useEffect(() => {
    loadPost();
  }, [selected]);
  // loadPost();

  return (
    <Tabs onSelectionChange={setSelected} aria-label="Options">
      {categories?.map((category) => (
        <Tab key={category?.name} title={category?.name}>
          <Card>
            <CardBody>
              {posts?.slice(0, 4)?.map((post) => (
                <div key={post?.id} className="flex gap-5 my-2">
                  <div className="w-1/4">
                    <Image
                      className="w-full rounded-md"
                      width={200}
                      height={150}
                      alt="NextUI Fruit Image with Zoom"
                      src={process.env.NEXT_PUBLIC_IMAGE_URL + post?.image_url}
                    />
                  </div>
                  <div className="3/4">
                    <Link href={`/posts/${post?.id}`}>
                      <h3 className="text-lg font-semibold">{post?.title}</h3>
                    </Link>
                    <p>{post?.description?.slice(0, 100)}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Tab>
      ))}
    </Tabs>
  );
};

export default SidebarPosts;
