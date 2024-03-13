import { ModalProps } from "shared/types";
import RenderIf from "src/shared/components/RenderIf";
import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";
import View from "./View";

const TeamModal: React.FC<ModalProps> = ({
  statusType,
  modalOpen,
  setModalOpen,
  selectedTeamId = { selectedTeamId },
}) => {
  const status = {
    view: (
      <RenderIf condition={modalOpen}>
        <View
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedTeamId={selectedTeamId}
        />
      </RenderIf>
    ),
    update: (
      <RenderIf condition={modalOpen}>
        <Update
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedTeamId={selectedTeamId}
        />
      </RenderIf>
    ),
    delete: (
      <Delete
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedTeamId={selectedTeamId}
      />
    ),
    create: <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
  };
  return statusType !== "resetPassword" ? status[statusType] : null;
};

export default TeamModal;
