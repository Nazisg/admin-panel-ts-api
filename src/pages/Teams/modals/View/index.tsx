import { Descriptions, Drawer, Flex, Tag } from "antd";
import { ActionModalProps } from "shared/types";
import { useGetTeamByIdQuery } from "src/redux/api/teams";

const View: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedTeamId,
}) => {
  const { data } = useGetTeamByIdQuery(selectedTeamId);
  return (
    <Drawer
      title="View Team"
      onClose={() => setModalOpen(false)}
      open={modalOpen}
    >
      <Descriptions layout="vertical" bordered column={1}>
        <Descriptions.Item label="Team">{data?.name}</Descriptions.Item>
        <Descriptions.Item label="Employees">
          <Flex wrap="wrap" gap={6}>
            {data?.users?.map((user) => (
              <Tag key={user.id}>
                {user?.firstName} {user?.lastName}
              </Tag>
            ))}
          </Flex>
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default View;
