import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Flex,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import ActionButton from "shared/components/ActionButton/index";
import { EmployeeType } from "shared/types";
import { useGetEmployeesFilterQuery } from "src/redux/api/employees";
import Filter from "src/shared/components/Filter";
import EmployeeModal from "../Employees/modals/index";
import styles from "./Employees.module.scss";
export default function Employees() {
  const { data } = useGetEmployeesFilterQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null); 

  const [status, setStatus] = useState<
    "view" | "delete" | "update" | "create" | "resetPassword"
  >("view");

  const handleCreate = () => {
    setModalOpen(true);
    setStatus("create");
  };
  const employees =
    data?.content?.map((employee) => ({
      key: employee.id,
      id: employee.id, 
      name: employee.firstName,
      surname: employee.lastName,
      mail: employee.mail,
      team: employee.team?.teamName,
      role: employee.role?.roleName,
      status: employee.status,
    })) ?? [];
  // const [status, setStatus] = useState<"active" | "deactive">("active");

  const columns: TableColumnsType<EmployeeType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Surname",
      dataIndex: "surname",
      ellipsis: true,
      sorter: (a, b) => a.surname.localeCompare(b.surname),
    },
    {
      title: "Mail",
      dataIndex: "mail",
      ellipsis: true,
    },
    {
      title: "Teams",
      dataIndex: "team",
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      render: (_, { status }) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "ACTIVE" : "DEACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Action",
      ellipsis: true,
      render: (_, record) => (
        <Space size="small">
          <ActionButton
            setStatus={setStatus}
            setModalOpen={setModalOpen}
            title="View"
            type="btnView"
            icon={<EyeOutlined />}
            employeeId={record.id} 
            setSelectedEmployeeId={setSelectedEmployeeId}
          />
          <ActionButton
            setStatus={setStatus}
            setModalOpen={setModalOpen}
            title="Update"
            icon={<EditOutlined />}
            type="btnUpdate"
            employeeId={record.id} 
            setSelectedEmployeeId={setSelectedEmployeeId}
          />
          <ActionButton
            setStatus={setStatus}
            setModalOpen={setModalOpen}
            title="ResetPassword"
            icon={<LockOutlined />}
            type="btnReset"
            employeeId={record.id} 
            setSelectedEmployeeId={setSelectedEmployeeId}
          />
          <ActionButton
            setStatus={setStatus}
            setModalOpen={setModalOpen}
            title="Delete"
            icon={<DeleteOutlined />}
            type="btnDel"
            employeeId={record.id} 
            setSelectedEmployeeId={setSelectedEmployeeId}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <EmployeeModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        statusType={status}
        selectedEmployeeId={selectedEmployeeId}
      />
      <Flex align="baseline" gap="small" className={styles.header}>
        <Typography.Title className="title">Employees</Typography.Title>
        <Flex gap="small" justify="flex-end">
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
        size="large"
        className="table"
        pagination={{ pageSize: 10 }}
        scroll={{ y: "350px", x: "auto" }}
        columns={columns}
        loading={data === undefined}
        dataSource={employees}
      />
      <Filter
        modalOpen={filterOpen}
        setModalOpen={setFilterOpen}
        statusType="employee"
      />
    </>
  );
}
