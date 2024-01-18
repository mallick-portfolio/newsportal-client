import Header from "@/app/components/shared/Header";
import { getById } from "@/app/lib/post/postData";
import config from "@/app/lib/utils/config";
import { Chip, Textarea } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const PostDetails = async ({ params }) => {
  const data = await getById(params?.id);
  const post = data?.data;
  console.log(post);
  return (
    <div>
      <Header />
      <div className="container mt-12">
        <h2 className="text-2xl my-4">{post?.title}</h2>
        <Image
          width={1000}
          height={500}
          src={config.image_domain + post?.image_url}
          alt=""
        />
        <Chip className="mt-5" variant="solid" color="danger">
          #{post?.category?.name}
        </Chip>
        <div>{post?.description}</div>
        <div className="my-5">
          <Textarea
            variant="bordered"
            label="Comment"
            placeholder="Enter your comment..."
            className="max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
