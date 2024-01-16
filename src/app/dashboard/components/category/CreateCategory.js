import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { setShowCreateCategoryModal } from "@/app/store/reducer/dashboardSlice";
import { useAddCategoryMutation } from "@/app/store/api/newsApi";

export default function CreateCategory() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { showCreateCategoryModal } = useSelector((state) => state.dashboard);

  // api call
  const [handleAdd, { data, isLoading }] = useAddCategoryMutation();

  // api response
  useEffect(() => {
    if (data && data?.success) {
      toast.success(data?.message);
      setTitle("");
      onOpenChange(false);
    } else if (data && !data?.success) {
      toast.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (showCreateCategoryModal) {
      onOpen();
    }
  }, [onOpen, showCreateCategoryModal]);

  useEffect(() => {
    dispatch(setShowCreateCategoryModal(isOpen));
  }, [dispatch, isOpen]);

  const handleAddTitle = () => {
    if (title && title !== "") {
      const data = {
        name: title,
      };
      handleAdd(data);
    }
  };

  // key down
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.key === "Enter") {
      handleAddTitle();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Category
              </ModalHeader>
              <ModalBody>
                <Input
                  onKeyDown={(e) => handleKeyDown(e)}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  autoFocus
                  label="Title"
                  placeholder="Enter your category title"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onPress={handleAddTitle}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
