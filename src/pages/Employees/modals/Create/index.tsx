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
import { useCreateEmployeeMutation } from "src/redux/api/employees";
const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
  const [createEmployee] = useCreateEmployeeMutation();
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
  const handleChangeRole = (value: string | string[], option: { key: React.Key; label: React.ReactNode }) => {
    console.log(`Selected: ${value}, ${option.label}`);
  };
  const onFinish = async (values: any) => {
    try {
      const { role, teamId, ...rest } = values;
      const selectedRole = roles?.find((r: any) => r.id === role);
      const dataToSend = {
        ...rest,
        role: {
          id: role,
          roleName: selectedRole.roleName,
        },
        teamId,
      };
      const response = await createEmployee(dataToSend).unwrap();
      console.log(response);
      setModalOpen(false); 
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  };

  return (
    <Modal
      title="Create Employee"
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
              label="Password"
              name="password"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="********" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Team"
              name="teamId"
              rules={[{ required: true, message: "" }]}
            >
              <Select
                size="large"
                onChange={handleChangeTeams}
                placeholder="Frontend"
                options={optionsTeams}
              />
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
                onChange={(value, option) => handleChangeRole(value, option)}
                placeholder="Employee"
                options={optionsRole}
              />
            </Form.Item>
          </Col>
        </Row>
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
