import { Button, Tooltip } from "antd";
import { useLocation } from "react-router-dom";
import { ActionButtonProps } from "shared/types";
import { useAppSelector } from "src/redux/hooks";
import styles from "./ActionButton.module.scss";

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  type,
  title,
  setModalOpen,
  setStatus,
  employeeId,
  teamId,
  projectId,
  reportId,
  setSelectedProjectId,
  setSelectedEmployeeId,
  setSelectedTeamId,
  setSelectedReportId,
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
  const location = useLocation();
  const role = useAppSelector((state) => state.auth.profile.role.roleName);
  return (
    <Tooltip placement="top" title={title}>
      <Button
        onClick={() => {
          setModalOpen(true);
          // @ts-ignore
          setStatus(status[title]);
          location.pathname === Urls.EMPLOYEE && role === "SUPER_ADMIN"
            ? setSelectedEmployeeId(employeeId)
            : null;
          location.pathname === Urls.TEAM ? setSelectedTeamId(teamId) : null;
          location.pathname === Urls.PROJECT
            ? setSelectedProjectId(projectId)
            : null;
          location.pathname === Urls.EMPLOYEE && role === "EMPLOYEE" || location.pathname === Urls.REPORT
            ? setSelectedReportId(reportId)
            : null;
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
