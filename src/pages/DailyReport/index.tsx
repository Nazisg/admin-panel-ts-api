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
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ReportType } from "shared/types";
import { useGetReportsAdminQuery } from "src/redux/api/reports";
import ActionButton from "src/shared/components/ActionButton";
import Filter from "src/shared/components/Filter";
import styles from "./DailyReport.module.scss";
import ReportModal from "./modals";

export default function DailyReport() {
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

  const columns: TableColumnsType<ReportType> = [
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
      render: (text) => text.slice(0, 20) + "...",
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
          <ActionButton
            setStatus={setStatus}
            setModalOpen={setModalOpen}
            title="Update"
            icon={<EditOutlined />}
            type="btnUpdate"
            reportId={record.id}
            setSelectedReportId={setSelectedReportId}
          />
        </Space>
      ),
    },
  ];

  const { data: reportsAdmin } = useGetReportsAdminQuery();
  const { data: reportUser } = useGetReportsAdminQuery();
  console.log(reportsAdmin);
  console.log(reportUser);

  const reportsAdminTable =
    reportsAdmin?.content?.map((report) => ({
      key: report?.id,
      id: report?.id,
      firstName: report?.firstName,
      lastName: report?.lastName,
      projectName: report?.project?.projectName,
      createdDate: report?.localDateTime,
      note: report?.reportText,
    })) ?? [];
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
            <Button icon={<UploadOutlined />} ghost type="primary" size="large">
              Export
            </Button>
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
          </Flex>
        </Flex>
      </Flex>
      <Table
        bordered
        size="large"
        className="table"
        // pagination={{ pageSize: 10 }}
        scroll={{ y: "350px", x: "auto" }}
        columns={columns}
        loading={reportsAdminTable === undefined}
        dataSource={reportsAdminTable}
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
      />
    </>
  );
}
