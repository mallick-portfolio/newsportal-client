import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { setShowDeletePostModal } from "@/app/store/reducer/dashboardSlice";
import { useDeletePostByIdMutation } from "@/app/store/api/newsApi";
import { MdDelete } from "react-icons/md";

export default function DeletePost() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { showDeletePostModal, selectedItem } = useSelector(
    (state) => state.dashboard
  );

  // api call
  const [handleDeletePost, { data, isLoading }] = useDeletePostByIdMutation();

  // api response
  useEffect(() => {
    if (data && data?.success) {
      toast.success(data?.message);
      onOpenChange(false);
    } else if (data && !data?.success) {
      toast.error(data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (showDeletePostModal) {
      onOpen();
    }
  }, [onOpen, showDeletePostModal]);

  useEffect(() => {
    dispatch(setShowDeletePostModal(isOpen));
  }, [dispatch, isOpen]);

  const handleDelete = () => {
    handleDeletePost(selectedItem?.id);
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
              <ModalHeader className="flex justify-center mx-auto gap-1">
                <p className="text-lg text-danger cursor-pointer active:opacity-50">
                  <MdDelete className="text-4xl" />
                </p>
              </ModalHeader>
              <ModalBody>
                <p>Are you sure want to delete this post</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={isLoading}
                  color="danger"
                  onPress={handleDelete}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
