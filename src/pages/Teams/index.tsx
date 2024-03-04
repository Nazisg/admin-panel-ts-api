import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
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
import { useGetTeamsQuery } from "src/redux/api/teams";
import ActionButton from "src/shared/components/ActionButton";
import Filter from "src/shared/components/Filter";
import { TeamType } from "src/shared/types";
import TeamModal from "./modals/index";
import { useAppSelector } from "src/redux/hooks";
export default function Teams() {
  const { data } = useGetTeamsQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState<
    "view" | "update" | "create" | "delete" | "resetPassword"
  >("view");
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const role = useAppSelector((state) => state.auth.profile.role.roleName);
  const handleCreate = () => {
    setModalOpen(true);
    setStatus("create");
  };

  const teams =
    data?.map((team) => ({
      key: team.id,
      id: team.id,
      team: team.teamName,
    })) ?? [];

  const columns: TableColumnsType<TeamType> = [
    {
      title: "Team",
      dataIndex: "team",
      ellipsis: true,
      sorter: (a, b) => (a.team && b.team ? a.team.localeCompare(b.team) : 0),
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
            teamId={record.id}
            setSelectedTeamId={setSelectedTeamId}
          />
          {role === "SUPER_ADMIN" || role === "ADMIN" ? (
            <ActionButton
              setStatus={setStatus}
              setModalOpen={setModalOpen}
              title="Update"
              icon={<EditOutlined />}
              type="btnUpdate"
              setSelectedTeamId={setSelectedTeamId}
              teamId={record.id}
            />
          ) : null}
                    {role === "SUPER_ADMIN" || role === "ADMIN" ? (

          <ActionButton
            setStatus={setStatus}
            setModalOpen={setModalOpen}
            title="Delete"
            icon={<DeleteOutlined />}
            type="btnDel"
            setSelectedTeamId={setSelectedTeamId}
            teamId={record.id}
          />):null}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex justify="space-between" align="baseline">
        <Typography.Title className="title">Teams</Typography.Title>
        <Flex justify="flex-end" align="center" gap="middle">
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
          </Tooltip>):null}
        </Flex>
      </Flex>
      <Table
        bordered
        className="table"
        scroll={{ y: "350px", x: "auto" }}
        columns={columns}
        dataSource={teams}
        loading={data === undefined}
      />
      <TeamModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        statusType={status}
        selectedTeamId={selectedTeamId}
      />
      <Filter
        modalOpen={filterOpen}
        setModalOpen={setFilterOpen}
        statusType="team"
      />
    </>
  );
}
