"use client";
import { addRating } from "@/app/lib/post/postData";
import { getUser } from "@/app/lib/user/userData";
import { Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PostComment = ({ post }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const getUserData = async () => {
    const user = await getUser();
    setUser(user?.data);
  };

  const handleSubmit = async () => {
    const data = {
      rating: rating,
      comment: comment,
    };
    const res = await addRating(post?.id, data);
    console.log("res", res?.success);
    if (res?.success) {
      toast.success(res?.message);
      setComment("");
      setRating(0);
      router.refresh();
    }

    // const res = await axios.post(
    //   `${config.api_url}/news/public/${post?.id}/rating/`,
    //   data,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${Cookies.get("auth_token")}`,
    //     },
    //   }
    // );
    // console.log(res);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const ratings = [
    {
      value: 0,
      label: "Zero",
    },
    {
      value: 1,
      label: "One",
    },
    {
      value: 2,
      label: "Two",
    },
    {
      value: 3,
      label: "Three",
    },
    {
      value: 4,
      label: "Four",
    },
  ];
  return (
    <>
      {user?.id ? (
        <div className="my-5">
          <h3>Give Raing</h3>
          <Select
            items={ratings}
            label="Favorite Animal"
            placeholder="Select rating"
            variant="bordered"
            className="max-w-xs my-5"
            onChange={(e) => setRating(e.target.value)}
          >
            {(rating) => (
              <SelectItem key={rating.value}>{rating.label}</SelectItem>
            )}
          </Select>
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            variant="bordered"
            label="Comment"
            placeholder="Enter your comment..."
            className="max-w-xs"
          />
          <Button
            onClick={() => handleSubmit()}
            variant="solid"
            color="success"
            className="text-white mt-5"
          >
            Submit
          </Button>
        </div>
      ) : (
        <div className="my-5">
          <p>Login to give review</p>
          <Button variant="bordered" color="success">
            <Link href={"/account/login"}>Login</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default PostComment;
