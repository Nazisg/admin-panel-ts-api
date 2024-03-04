import { Descriptions, Drawer, Flex, Tag } from "antd";
import { ActionModalProps } from "shared/types";
import { useGetTeamByIdQuery } from "src/redux/api/teams";

const View: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedTeamId,
}) => {
  const { data: team } = useGetTeamByIdQuery(selectedTeamId as any);
  return (
    <Drawer
      title="View Team"
      onClose={() => setModalOpen(false)}
      open={modalOpen}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Team">{team?.name}</Descriptions.Item>
        <Descriptions.Item label="Employees">
          <Flex wrap="wrap" gap={6}>
            {team?.users?.map((user) => (
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
