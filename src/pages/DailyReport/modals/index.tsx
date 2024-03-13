import { ModalProps } from "shared/types";
import RenderIf from "src/shared/components/RenderIf";
import Create from "./Create";
import Update from "./Update";
import View from "./View";

const ReportModal: React.FC<ModalProps> = ({
  statusType,
  modalOpen,
  setModalOpen,
  selectedReportId,
}) => {
  const status = {
    view: (
      <RenderIf condition={modalOpen}>
        <View
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedReportId={selectedReportId}
        />
      </RenderIf>
    ),
    update: (
      <RenderIf condition={modalOpen}>
        <Update
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedReportId={selectedReportId}
        />
      </RenderIf>
    ),
    create: <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
  };
  return statusType !== "resetPassword" && statusType !== "delete"
    ? status[statusType]
    : null;
};

export default ReportModal;
