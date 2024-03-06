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
  message,
} from "antd";
import { useEffect, useState } from "react";
import ActionButton from "shared/components/ActionButton/index";
import { EmployeeType } from "shared/types";
import {
  useGetEmployeesFilterQuery,
  useUpdateStatusMutation,
} from "src/redux/api/employees";
import { useAppSelector } from "src/redux/hooks";
import Filter from "src/shared/components/Filter";
import EmployeeModal from "../Employees/modals/index";
import styles from "./Employees.module.scss";
import RenderIf from "src/shared/components/RenderIf";

export default function Employees() {
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10 });
  const [query, setQuery] = useState("");
  const { data: employeeData } = useGetEmployeesFilterQuery(query);

  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const role = useAppSelector((state) => state.auth.profile.role.roleName);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [status, setStatus] = useState<
    "view" | "delete" | "update" | "create" | "resetPassword"
  >("view");

  const handleCreate = () => {
    setModalOpen(true);
    setStatus("create");
  };

  const employees =
    employeeData?.content?.map((employee) => ({
      key: employee?.id,
      id: employee?.id,
      name: employee?.firstName,
      surname: employee?.lastName,
      mail: employee?.mail,
      team: employee?.team?.teamName,
      role: employee?.role?.roleName,
      status: employee?.status,
    })) ?? [];

  const [updateStatus, { isSuccess }] = useUpdateStatusMutation();
  const handleClickStatus = (id: string) => {
    const user: EmployeeType | undefined = (
      employeeData?.content as EmployeeType[]
    )?.find((item: { id: string }) => item.id === id);

    const newStatus = user?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    updateStatus({
      userId: id,
      newStatus: newStatus,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      message.success("Status updated successfully");
    }
  }, [isSuccess]);

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
      sorter: (a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0),
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
      render: (_, record) => (
        <Tag
          className={styles.statusbtn}
          color={record.status === "ACTIVE" ? "green" : "red"}
          onClick={() => handleClickStatus(record.id)}
        >
          {record.status}
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
          {role === "SUPER_ADMIN" || role === "ADMIN" ? (
            <ActionButton
              setStatus={setStatus}
              setModalOpen={setModalOpen}
              title="Update"
              icon={<EditOutlined />}
              type="btnUpdate"
              employeeId={record.id}
              setSelectedEmployeeId={setSelectedEmployeeId}
            />
          ) : null}
          {role === "SUPER_ADMIN" || role === "ADMIN" ? (
            <ActionButton
              setStatus={setStatus}
              setModalOpen={setModalOpen}
              title="ResetPassword"
              icon={<LockOutlined />}
              type="btnReset"
              employeeId={record.id}
              setSelectedEmployeeId={setSelectedEmployeeId}
            />
          ) : null}
          {role === "SUPER_ADMIN" || role === "ADMIN" ? (
            <ActionButton
              setStatus={setStatus}
              setModalOpen={setModalOpen}
              title="Delete"
              icon={<DeleteOutlined />}
              type="btnDel"
              employeeId={record.id}
              setSelectedEmployeeId={setSelectedEmployeeId}
            />
          ) : null}
        </Space>
      ),
    },
  ];
  const handleTableChange = (pagination: any) => {
    const queryParams = new URLSearchParams(query);
    queryParams.set('pageNumber', pagination.current.toString());
    queryParams.set('pageSize', pagination.pageSize.toString());
    const updatedQuery = `${queryParams.toString()}`;
    setQuery(updatedQuery);
};
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
        size="large"
        className="table"
        pagination={{
          ...pagination,
          total: employeeData?.totalElements,
        }}
        scroll={{ y: "350px", x: "auto" }}
        columns={columns}
        loading={employeeData === undefined}
        dataSource={employees}
        onChange={handleTableChange}
      />
        <Filter
          modalOpen={filterOpen}
          setModalOpen={setFilterOpen}
          statusType="employee"
          setQuery={setQuery}
        />
    </>
  );
}
