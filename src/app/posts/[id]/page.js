/* eslint-disable @next/next/no-img-element */
import PostComment from "@/app/components/post/PostComment";
import Header from "@/app/components/shared/Header";
import { getById, getPosts } from "@/app/lib/post/postData";
import config from "@/app/lib/utils/config";
import { Card, CardHeader, Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostDetails = async ({ params }) => {
  const data = await getById(params?.id);
  const post = data?.data;
  const postsData = await getPosts(`?category=${post?.category?.name}`);
  const relatedPosts = postsData?.data?.slice(0, 2);
  const ratings = post?.post_rating;
  const totalRating = ratings?.reduce((total, item) => {
    return total + item?.rating;
  }, 0);
  const avg = totalRating / ratings?.length;

  return (
    <div>
      <Header />
      <div className="container mt-12">
        <h2 className="text-2xl my-4">{post?.title}</h2>
        <img className="w-full h-full" src={post?.image_url} alt="" />
        <Chip className="mt-5" variant="solid" color="danger">
          Category #{post?.category?.name}
        </Chip>
        <Chip className="mt-5 ml-2 text-white" variant="solid" color="success">
          Avarage rating {avg?.toFixed(2)}
        </Chip>
        <div>{post?.description}</div>
        <PostComment post={post} />
        <div>
          <h3 className="text-3xl font-semibold my-5">Related Article</h3>
          <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
            {relatedPosts?.map((post) => (
              <Card
                key={post?.id}
                className="col-span-12 sm:col-span-4 h-[300px]"
              >
                <Link href={`/posts/${post.id}`}>
                  <CardHeader className="flex flex-col">
                    <img
                      alt="Card background"
                      className="w-full h-full object-cover"
                      src={post?.image_url}
                    />
                    <p className="mt-5 uppercase text-large font-bold">
                      {post?.title}
                    </p>
                    <h4 className=" font-medium">
                      {post?.description?.slice(0, 50)}
                    </h4>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
