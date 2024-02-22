import { Button, Tooltip } from "antd";
import { ActionButtonProps } from "shared/types";
import styles from "./ActionButton.module.scss";
import { useLocation } from "react-router-dom";

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  type,
  title,
  setModalOpen,
  setStatus,
  employeeId,
  teamId,
  setSelectedEmployeeId,
  setSelectedTeamId
}) => {
  const status = {
    View: "view",
    Update: "update",
    Delete: "delete",
    ResetPassword: "resetPassword",
  };
  
const enum Urls {
  TEAM = "/teams",
  PROJECT = "/projects",
  REPORT = "/reports",
  EMPLOYEE = "/",
}
  const location = useLocation()
  return (
    <Tooltip placement="top" title={title}>
      <Button
        onClick={() => {
          setModalOpen(true);
          // @ts-ignore
          setStatus(status[title]);
          location.pathname === Urls.EMPLOYEE ? setSelectedEmployeeId(employeeId): null;
          location.pathname === Urls.TEAM ?     setSelectedTeamId(teamId):null
          // location.pathname === Urls.PROJECT ? setSelectedTeamId(teamId):null
        }}
        shape="circle"
        className={styles[type]}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

export default ActionButton;
