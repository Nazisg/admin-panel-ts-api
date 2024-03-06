import { ModalProps } from "shared/types";
import RenderIf from "src/shared/components/RenderIf";
import Create from "./Create";
import Update from "./Update";
import View from "./View";
const ProjectModal: React.FC<ModalProps> = ({
  statusType,
  modalOpen,
  setModalOpen,
  selectedProjectId,
}) => {
  const status = {
    view: (
      <RenderIf condition={modalOpen}>
        <View
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedProjectId={selectedProjectId}
        />
      </RenderIf>
    ),
    update: (
      <RenderIf condition={modalOpen}>
        <Update
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedProjectId={selectedProjectId}
        />
      </RenderIf>
    ),
    create: (
      <Create
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedProjectId={selectedProjectId}
      />
    ),
  };
  return statusType !== "resetPassword" ? status[statusType] : null;
};

export default ProjectModal;
