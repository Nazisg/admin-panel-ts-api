import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  SelectProps,
} from "antd";
import { ActionModalProps } from "shared/types";
import { useGetRolesQuery } from "src/redux/api/roles";
import { useGetTeamsQuery } from "src/redux/api/teams";
import { useUpdateEmployeeMutation } from "src/redux/api/employees";

const Update: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
 
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const [form] = Form.useForm();
  const { data: roles } = useGetRolesQuery();
  const { data: teams } = useGetTeamsQuery();
  const optionsTeams: SelectProps["options"] = [];
  const optionsRole: SelectProps["options"] = [];

  if (Array.isArray(teams)) {
    teams?.map((team) => {
      optionsTeams.push({
        value: team.id,
        label: team.teamName,
      });
    });
  }

  if (Array.isArray(roles)) {
    roles.forEach((role) => {
      optionsRole.push({
        value: role.id,
        label: role.roleName,
      });
    });
  }
  const handleChangeTeams = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  const handleChangeRole = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  const onFinish = (values: any) => {
    // Make sure to include employee ID in values
    const { id, firstName, lastName, mail, role, team } = values;
    updateEmployee({ id, firstName, lastName, mail, role, team }).unwrap()
      .then(() => {
        console.log("Employee updated successfully");
        form.resetFields(); // Reset form fields after successful update
        setModalOpen(false); // Close modal
      })
      .catch((error) => {
        console.error("Failed to update employee:", error);
      });
  };
  return (
    <Modal
      title="Update Employee"
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      centered
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label=" Name"
              name="firstName"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="Nazrin" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Surname"
              name="lastName"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="Isgandarova" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Mail"
              name="mail"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="nazrin@crocusoft.az" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "" }]}
            >
              <Select
                size="large"
                onChange={handleChangeRole}
                placeholder="Employee"
                options={optionsRole}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Team"
          name="team"
          rules={[{ required: true, message: "" }]}
        >
          <Select
            size="large"
            onChange={handleChangeTeams}
            placeholder="Frontend"
            options={optionsTeams}
          />
        </Form.Item>
        <Flex justify="end">
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default Update;
