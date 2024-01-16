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
import { useGetCategoriesQuery } from "@/app/store/api/newsApi";
import { MdDelete, MdEditSquare } from "react-icons/md";

export default function CategoryRow() {
  const { data } = useGetCategoriesQuery();
  let categoryLog;
  if (data && data?.data?.length) {
    categoryLog = data?.data?.map((category) => (
      <TableRow key={category?.id}>
        <TableCell>{category?.id}</TableCell>
        <TableCell>{category?.name}</TableCell>
        <TableCell>{category?.slug}</TableCell>
        <TableCell>
          <div className="relative flex items-center gap-2">
            <Tooltip placement="right-end" content="Edit Category">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdEditSquare />
              </span>
            </Tooltip>
            <Tooltip
              placement="right-end"
              color="danger"
              content="Delete Category"
            >
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
        <TableColumn>Name</TableColumn>
        <TableColumn>Slug</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>{categoryLog}</TableBody>
    </Table>
  );
}
