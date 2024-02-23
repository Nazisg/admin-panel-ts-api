import {
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusOutlined,
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
import { ProjectType } from "shared/types";
import ActionButton from "src/shared/components/ActionButton";
import Filter from "src/shared/components/Filter";
import styles from "./Projects.module.scss";
import ProjectModal from "./modals/";
import { useGetProjectsFilterQuery } from "src/redux/api/projects";

export default function Projects() {
  const { data } = useGetProjectsFilterQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState<
    "view" | "delete" | "update" | "create" | "resetPassword"
  >("view");
  console.log(useGetProjectsFilterQuery())
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const projects =
    data?.content?.map((project) => ({
      key: project.id,
      id: project.id,
      project: project.projectName,
    })) ?? [];

  const handleCreate = () => {
    setModalOpen(true);
    setStatus("create");
  };
  const columns: TableColumnsType<ProjectType> = [
    {
      key: "Project",
      title: "Project",
      dataIndex: "project",
      ellipsis: true,
      sorter: (a, b) => a.project.localeCompare(b.project),
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
            projectId={record.id}
            setSelectedProjectId={setSelectedProjectId}
          />
          <ActionButton
            setStatus={setStatus}
            setModalOpen={setModalOpen}
            title="Update"
            icon={<EditOutlined />}
            type="btnUpdate"
            projectId={record.id}
            setSelectedProjectId={setSelectedProjectId}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex align="baseline" gap="small" className={styles.header}>
        <Typography.Title className="title">Projects</Typography.Title>
        <Flex justify="flex-end" align="center" gap="small">
          <Button
            onClick={() => setFilterOpen(true)}
            icon={<FilterOutlined />}
            size="large"
            type="primary"
            ghost
          >
            Filter
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
      <Table
        bordered
        className="table"
        scroll={{ y: "350px", x: "auto" }}
        columns={columns}
        loading={data === undefined}
        dataSource={projects}
      />
      <ProjectModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        statusType={status}
        selectedProjectId={selectedProjectId}
      />
      <Filter
        modalOpen={filterOpen}
        setModalOpen={setFilterOpen}
        statusType="project"
      />
    </>
  );
}
