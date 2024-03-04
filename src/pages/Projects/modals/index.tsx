import { ModalProps } from "shared/types";
import Create from "./Create";
import Update from "./Update";
import View from "./View";
const ProjectModal: React.FC<ModalProps> = ({
  statusType,
  modalOpen,
  setModalOpen,
  selectedProjectId
}) => {
  const status = {
    view: <View modalOpen={modalOpen} setModalOpen={setModalOpen} selectedProjectId={selectedProjectId}/>,
    update: <Update modalOpen={modalOpen} setModalOpen={setModalOpen} selectedProjectId={selectedProjectId}/>,
    create: <Create modalOpen={modalOpen} setModalOpen={setModalOpen} selectedProjectId={selectedProjectId}/>,
  };
  return statusType !== "resetPassword"
    ? 
      status[statusType]
    : null;
};

export default ProjectModal;
