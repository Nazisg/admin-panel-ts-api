import { Modal } from "antd";
import React from "react";
import { ActionModalProps } from "shared/types";
import { useDeleteEmployeeMutation } from "src/redux/api/employees";
const Delete: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen, selectedEmployeeId }) => {
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const handleDelete = () => {
    if (selectedEmployeeId !== null) {
      deleteEmployee(String(selectedEmployeeId)); 
    }
    setModalOpen(false)
  };
 return (
    <>
      <Modal
        // centered
        title="Do you want to delete this employee?"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleDelete}
        okType="danger"
      ></Modal>
    </>
  );
};

export default Delete;
