import { Descriptions, Drawer, Flex, Tag } from "antd";
import { ActionModalProps } from "shared/types";
import { useGetProjectByIdQuery } from "src/redux/api/projects";

const View: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedProjectId,
}) => {
  const { data: project } = useGetProjectByIdQuery(selectedProjectId as any);
  return (
    <Drawer
      title="View Project"
      onClose={() => setModalOpen(false)}
      open={modalOpen}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Project">
          {project?.projectName}
        </Descriptions.Item>
        <Descriptions.Item label="Employees">
          <Flex wrap="wrap" gap={6}>
            {project?.users?.map((user) => (
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
