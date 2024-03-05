import {
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Flex,
  Space,
  Table,
  TableColumnsType,
  Tooltip,
  Typography,
} from "antd";
import { saveAs } from "file-saver";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ReportType } from "shared/types";
import {
  useGetReportsAdminQuery,
  useGetReportsExportQuery,
  useGetReportsUserQuery,
} from "src/redux/api/reports";
import { useAppSelector } from "src/redux/hooks";
import ActionButton from "src/shared/components/ActionButton";
import Filter from "src/shared/components/Filter";
import * as XLSX from "xlsx";
import styles from "./DailyReport.module.scss";
import ReportModal from "./modals";

export default function DailyReport() {
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10 });
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState<
    "view" | "update" | "create" | "delete" | "resetPassword"
  >("view");
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  const handleCreate = () => {
    setModalOpen(true);
    setStatus("create");
  };
  const role = useAppSelector((state: any) => state.auth.profile.role.roleName);
  const columns: TableColumnsType<ReportType> = [
    ...(role !== "EMPLOYEE"
      ? [
          {
            title: "Name",
            dataIndex: "firstName",
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
            ellipsis: true,
          },
          {
            title: "Surname",
            dataIndex: "lastName",
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
            ellipsis: true,
          },
        ]
      : []),
    {
      title: "Project",
      dataIndex: "projectName",
      ellipsis: true,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      ellipsis: true,
      render: (text) => text.slice(0, 10),
    },
    {
      title: "Note",
      dataIndex: "note",
      ellipsis: true,
      render: (text) => (text.length >= 20 ? text.slice(0, 20) + "..." : text),
    },
    {
      title: "Action",
      key: "action",
      ellipsis: true,
      render: (_, record) => (
        <Space size="small">
          <ActionButton
            setStatus={setStatus}
            setModalOpen={setModalOpen}
            title="View"
            icon={<EyeOutlined />}
            type="btnView"
            reportId={record.id}
            setSelectedReportId={setSelectedReportId}
          />
          {role === "EMPLOYEE" && (
            <ActionButton
              setStatus={setStatus}
              setModalOpen={setModalOpen}
              title="Update"
              icon={<EditOutlined />}
              type="btnUpdate"
              reportId={record.id}
              setSelectedReportId={setSelectedReportId}
            />
          )}
        </Space>
      ),
    },
  ];

  const { data: reportAdmin } = useGetReportsAdminQuery(query);
  const { data: reportUser } = useGetReportsUserQuery(query);
  const { data: exportExcel } = useGetReportsExportQuery(query);
  const reportsTable =
    role === "EMPLOYEE"
      ? (reportUser?.content ?? []).map((reportU) => ({
          key: reportU?.id,
          id: reportU?.id,
          projectName: reportU?.project?.projectName,
          createdDate: reportU?.localDateTime,
          note: reportU?.reportText,
        }))
      : (reportAdmin?.content ?? []).map((report) => ({
          key: report?.id,
          id: report?.id,
          firstName: report?.firstName,
          lastName: report?.lastName,
          projectName: report?.project?.projectName,
          createdDate: report?.localDateTime,
          note: report?.reportText,
        }));

  const handleExport = () => {
    const exportData = reportsTable.map((report) => ({
      Name: report.firstName ? `${report.firstName} ${report.lastName}` : "",
      Project: report.projectName,
      "Created Date": report.createdDate,
      Note: report.note,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(data, "daily_reports.xlsx");
  };
  const handleTableChange = (pagination: any) => {
    setPagination({
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    });

    const queryString = `pageNumber=${pagination.current}&pageSize=${pagination.pageSize}`;
    setQuery(queryString);
  };
  return (
    <>
      <Flex align="baseline" gap="small" className={styles.header}>
        <Typography.Title className="title">Daily Report</Typography.Title>
        <Flex
          justify="flex-end"
          align="center"
          gap="small"
          className={styles.btns}
        >
          <Button
            onClick={() => setFilterOpen(true)}
            icon={<FilterOutlined />}
            size="large"
            type="primary"
            ghost
          >
            Filter
          </Button>
          <Flex gap="small">
            {role !== "EMPLOYEE" ? (
              <Button
                icon={<UploadOutlined />}
                ghost
                type="primary"
                size="large"
                onClick={handleExport}
              >
                Export
              </Button>
            ) : null}
            {role === "EMPLOYEE" ? (
              <Tooltip placement="top" title="Create">
                <Button
                  onClick={handleCreate}
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  size="large"
                  className="create-btn"
                ></Button>
              </Tooltip>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
      <Table
        bordered
        size="large"
        className="table"
        pagination={{
          ...pagination,
          total:
            role === "EMPLOYEE"
              ? reportUser?.totalElements
              : reportAdmin?.totalElements,
        }}
        onChange={handleTableChange}
        scroll={{ y: "350px", x: "auto" }}
        columns={columns}
        loading={reportUser === undefined || reportAdmin === undefined}
        dataSource={reportsTable}
      />
      <ReportModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        statusType={status}
        selectedReportId={selectedReportId}
      />
      <Filter
        modalOpen={filterOpen}
        setModalOpen={setFilterOpen}
        statusType="report"
        setQuery={setQuery}
      />
    </>
  );
}
