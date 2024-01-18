/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { useGetPostsQuery } from "@/app/store/api/newsApi";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  setSelectedItem,
  setShowDeletePostModal,
} from "@/app/store/reducer/dashboardSlice";

export default function PostRow() {
  const dispatch = useDispatch();
  const { data } = useGetPostsQuery();

  let categoryLog;
  if (data && data?.data?.length) {
    categoryLog = data?.data?.map((post) => (
      <TableRow key={post?.id}>
        <TableCell>{post?.id}</TableCell>
        <TableCell>
          <img
            className="w-24 h-auto rounded-md"
            src={process.env.NEXT_PUBLIC_IMAGE_URL + post?.image_url}
            alt=""
          />
        </TableCell>
        <TableCell>{post?.title}</TableCell>
        <TableCell>
          <div dangerouslySetInnerHTML={{ __html: post?.description }}></div>
        </TableCell>
        <TableCell>
          <div className="relative flex items-center gap-2">
            <Tooltip placement="right-end" content="Show Post">
              <Link href={`/dashboard/news/${post?.id}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <FaRegEye />
                </span>
              </Link>
            </Tooltip>
            <Tooltip placement="right-end" content="Edit Post">
              <Link href={`/dashboard/news/edit/${post?.id}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <MdEditSquare />
                </span>
              </Link>
            </Tooltip>
            <Tooltip placement="right-end" color="danger" content="Delete Post">
              <span
                onClick={() => {
                  dispatch(setShowDeletePostModal(true));
                  dispatch(setSelectedItem(post));
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <MdDelete />
              </span>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    ));
  }
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        <TableColumn>Id</TableColumn>
        <TableColumn>Image</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Content</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>{categoryLog}</TableBody>
    </Table>
  );
}