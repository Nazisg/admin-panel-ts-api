import { Button, Flex, Form, Input, Modal, Select, SelectProps } from "antd";
import { ActionModalProps } from "shared/types";
import { useCreateProjectMutation } from "src/redux/api/projects";
import { useGetEmployeesQuery } from "src/redux/api/employees";
const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
  const [createProject] = useCreateProjectMutation();
  const { data: employees } = useGetEmployeesQuery();
  console.log(createProject)
  const onFinish = async (values: any) => {
    try {
      const response = await createProject({
        projectName: values.projectName,
        userIds: values.userIds,
      }).unwrap();
      console.log("Project created successfully:", response);
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const optionsEmployees: SelectProps["options"] = [];
  
  if (Array.isArray(employees)) {
    employees.map((employee) => {
      optionsEmployees.push({
        value: employee.id,
        label: employee.fullName,
      });
    });
  }
  const handleChangeEmployees = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  return (
    <Modal
      title="Create Project"
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Project Name"
          name="projectName"
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder="Plast" size="large" />
        </Form.Item>
        <Form.Item
          label="Employees"
          name="userIds" 
          rules={[{ required: true, message: "" }]}
        >
          <Select
            mode="tags"
            size="large"
            placeholder="Furniro"
            onChange={handleChangeEmployees}
            options={optionsEmployees}
          />
        </Form.Item>
        <Flex justify="end">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default Create;
