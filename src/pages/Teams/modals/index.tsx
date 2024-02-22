import { ModalProps } from "shared/types";
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";
import View from "./View";

const TeamModal: React.FC<ModalProps> = ({
  statusType,
  modalOpen,
  setModalOpen,
  selectedTeamId={selectedTeamId}
}) => {
  const status = {
    view: <View modalOpen={modalOpen} setModalOpen={setModalOpen} selectedTeamId={selectedTeamId}/>,
    update: <Update modalOpen={modalOpen} setModalOpen={setModalOpen} selectedTeamId={selectedTeamId}/>,
    delete: <Delete modalOpen={modalOpen} setModalOpen={setModalOpen} selectedTeamId={selectedTeamId}/>,
    create: <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
  };
  return statusType !== "resetPassword" ? status[statusType] : null;
};

export default TeamModal;
