import { Descriptions, Drawer, Flex, Tag } from "antd";
import { ActionModalProps } from "shared/types";
import { useGetEmployeeByIdQuery } from "src/redux/api/employees";

const View: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedEmployeeId,
}) => {
  const { data } = useGetEmployeeByIdQuery(selectedEmployeeId);

  return (
    <Drawer
      title="View Employee"
      onClose={() => setModalOpen(false)}
      open={modalOpen}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{data?.firstName}</Descriptions.Item>
        <Descriptions.Item label="Surname">{data?.lastName}</Descriptions.Item>
        <Descriptions.Item label="Email">{data?.mail}</Descriptions.Item>
        <Descriptions.Item label="Team">
          {data?.team?.teamName}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          <Tag color="geekblue"> {data?.role?.roleName}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={data?.status === "ACTIVE" ? "green" : "red"}>
            {data?.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Projects">
          <Flex wrap="wrap" gap={6}>
            {data?.projects?.map((project) => (
              <Tag color="purple" key={project.id}>
                {project.projectName}
              </Tag>
            ))}
          </Flex>
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default View;
