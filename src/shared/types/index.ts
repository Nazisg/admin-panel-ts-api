import React, { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  statusType: "view" | "delete" | "update" | "create" | "resetPassword";
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedEmployeeId?: number | null;
  selectedTeamId?: number | null;
  selectedProjectId?: number | null;
  selectedReportId?: number | null;
}

export interface FilterProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setQuery:string | any;
  statusType:
    | "employee"
    | "team"
    | "project"
    | "report"
    | "resetPassword"
    | any;

}

export interface TeamType {
  key: React.Key;
  teamName: string;
  // employees: {
  //   name: string;
  //   surname: string;
  // }[];
}

export interface ReportType {
  key: React.Key;
  employee: string;
  note: string;
  projectName: string;
  createdDate: string;
  firstName?: string | any;
  lastName?:string | any;
}

export interface ProjectType {
  key: React.Key;
  // id: number;
  project: string;
  projectName: string;
}

export interface EmployeeType {
  key: React.Key;
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  name: string;
  surname: string;
  mail: string;
  team: { teamName: string };
  role: { roleName: string };
  status: boolean;
}

export interface RenderIfProps {
  children: React.ReactNode;
  condition: boolean;
  renderElse?: React.ReactNode;
}

export interface TableProps {
  setStatus: Dispatch<
    SetStateAction<"view" | "delete" | "update" | "create" | "resetPassword">
  >;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ActionModalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedEmployeeId: number | null;
  selectedTeamId: number | null;
  selectedProjectId: number | null;
  selectedReportId: number | null;
}

export interface ActionButtonProps {
  icon: JSX.Element;
  type: string;
  title: string;
  employeeId: number | string;
  teamId: number | string;
  projectId: number | string;
  reportId:number | string;
  setSelectedEmployeeId:any;
  setSelectedProjectId: number | null | any
  setSelectedTeamId:any;
  setSelectedReportId: number| null | any

  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setStatus: Dispatch<
    SetStateAction<"view" | "delete" | "update" | "create" | "resetPassword">
  >;
}
