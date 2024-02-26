import { ModalProps } from "shared/types";
import Create from "./Create";
import Update from "./Update";
import View from "./View";

const ReportModal: React.FC<ModalProps> = ({
  statusType,
  modalOpen,
  setModalOpen,
  selectedReportId
}) => {
  const status = {
    view: <View modalOpen={modalOpen} setModalOpen={setModalOpen} selectedReportId={selectedReportId}/>,
    update: <Update modalOpen={modalOpen} setModalOpen={setModalOpen} selectedReportId={selectedReportId}/>,
    create: <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
  };
  return statusType !== "resetPassword" && statusType !== "delete"
    ? status[statusType]
    : null;
};

export default ReportModal;
