import Header from "@/app/components/shared/Header";
import { getPosts } from "@/app/lib/post/postData";
import React from "react";

const NewsByCategory = async ({ params }) => {
  const posts = await getPosts(`?category=${params?.category}`);
  console.log(posts);
  return (
    <div>
      <Header />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error inventore
      repellendus ut animi voluptatum ab aspernatur doloremque repudiandae,
      velit accusamus ullam veniam quis quo officiis placeat harum consectetur.
      Est, architecto?
    </div>
  );
};

export default NewsByCategory;
