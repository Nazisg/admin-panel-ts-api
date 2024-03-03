import { Modal, message } from "antd";
import React from "react";
import { ActionModalProps } from "shared/types";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "src/redux/api/employees";
const Delete: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedEmployeeId,
}) => {

  const [deleteEmployee] = useDeleteEmployeeMutation();
  const { data: employee } = useGetEmployeeByIdQuery(
    selectedEmployeeId as number
  );

  const handleDelete = () => {
    if (selectedEmployeeId !== null) {
      deleteEmployee(String(selectedEmployeeId));
    }
    setModalOpen(false);
    message.success("Employee deleted successfully");
  };

  return (
    <>
      <Modal
        centered
        title={`Do you want to delete ${employee?.firstName} ${employee?.lastName}?`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleDelete}
        okType="danger"
      ></Modal>
    </>
  );
};

export default Delete;
