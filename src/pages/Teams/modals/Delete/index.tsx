import { Modal, message } from "antd";
import { ActionModalProps } from "shared/types";
import {
  useDeleteTeamMutation,
  useGetTeamByIdQuery,
} from "src/redux/api/teams";

const Delete: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedTeamId,
}) => {
  const [deleteTeam] = useDeleteTeamMutation();
  const { data: team } = useGetTeamByIdQuery(selectedTeamId as number);

  const handleDelete = () => {
    deleteTeam(String(selectedTeamId));
    setModalOpen(false);
    message.success("Team deleted successfully");
  };

  return (
    <Modal
      centered
      title={`Do you want to delete ${team?.name}?`}
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      onOk={handleDelete}
      okType="danger"
    ></Modal>
  );
};

export default Delete;
