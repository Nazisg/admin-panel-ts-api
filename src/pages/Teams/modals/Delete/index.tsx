import { Modal } from "antd";
import { ActionModalProps } from "shared/types";
import { useDeleteTeamMutation } from "src/redux/api/teams";

const Delete: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen, selectedTeamId }) => {
  const [deleteTeam] = useDeleteTeamMutation();
  const handleDelete = () => {
      deleteTeam(String(selectedTeamId));
 
    setModalOpen(false);
  };
  return (
    <Modal
      // centered
      title="Do you want to delete this Team?"
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      onOk={handleDelete}
      okType="danger"
    ></Modal>
  );
};

export default Delete;
