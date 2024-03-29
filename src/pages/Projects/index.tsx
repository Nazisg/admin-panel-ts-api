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
import { useGetProjectsFilterQuery } from "src/redux/api/projects";
import { useAppSelector } from "src/redux/hooks";
import ActionButton from "src/shared/components/ActionButton";
import Filter from "src/shared/components/Filter";
import styles from "./Projects.module.scss";
import ProjectModal from "./modals/";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10 });

  const { data: ProjectData } = useGetProjectsFilterQuery(query);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const role = useAppSelector((state) => state.auth.profile.role.roleName);
  const [status, setStatus] = useState<
    "view" | "delete" | "update" | "create" | "resetPassword"
  >("view");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const handleCreate = () => {
    setModalOpen(true);
    setStatus("create");
  };

  const projects =
    ProjectData?.content?.map((project) => ({
      key: project.id,
      id: project.id,
      project: project.projectName,
    })) ?? [];

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
          {role === "SUPER_ADMIN" || role === "ADMIN" ? (
            <ActionButton
              setStatus={setStatus}
              setModalOpen={setModalOpen}
              title="Update"
              icon={<EditOutlined />}
              type="btnUpdate"
              projectId={record.id}
              setSelectedProjectId={setSelectedProjectId}
            />
          ) : null}
        </Space>
      ),
    },
  ];
  const handleTableChange = (pagination: any) => {
    const queryParams = new URLSearchParams(query);
    queryParams.set("page", pagination.current.toString());
    queryParams.set("size", pagination.pageSize.toString());
    const updatedQuery = `${queryParams.toString()}`;
    setQuery(updatedQuery);
  };
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
          {role === "SUPER_ADMIN" || role === "ADMIN" ? (
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
      <Table
        bordered
        className="table"
        scroll={{ y: "350px", x: "auto" }}
        pagination={{
          ...pagination,
          total: ProjectData?.totalElements,
        }}
        onChange={handleTableChange}
        columns={columns}
        loading={ProjectData === undefined}
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
        setQuery={setQuery}
      />
    </>
  );
}
