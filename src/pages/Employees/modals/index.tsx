import { ModalProps } from "shared/types";
import RenderIf from "src/shared/components/RenderIf";
import Create from "./Create";
import Delete from "./Delete";
import ResetPassword from "./ResetPassword";
import Update from "./Update";
import View from "./View";

const EmployeeModal: React.FC<
  ModalProps & { selectedEmployeeId: number | null }
> = ({ statusType, modalOpen, setModalOpen, selectedEmployeeId }) => {
  const status = {
    view: (
      <RenderIf condition={modalOpen}>
        <View
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedEmployeeId={selectedEmployeeId}
        />
      </RenderIf>
    ),
    update: (
      <RenderIf condition={modalOpen}>
        <Update
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedEmployeeId={selectedEmployeeId}
        />
      </RenderIf>
    ),
    delete: (
      <Delete
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedEmployeeId={selectedEmployeeId}
      />
    ),
    create: <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
    resetPassword: (
      <ResetPassword
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedEmployeeId={selectedEmployeeId}
      />
    ),
  };
  return status[statusType];
};

export default EmployeeModal;
