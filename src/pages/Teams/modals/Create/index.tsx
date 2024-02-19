import { Button, Flex, Form, Input, Modal } from "antd";
import { ActionModalProps } from "shared/types";
import { useCreateTeamsMutation } from "src/redux/api/teams";
const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
  const [createTeam] = useCreateTeamsMutation();
  interface TeamType {
    id: number;
    teamName: string;
    status: string;
  }
  const onFinish = (values: { team: string }) => {
    console.log("Success:", values);
    const newTeam: TeamType = { teamName: values.team, id: 0, status: "" }; 
    createTeam(newTeam);
    setModalOpen(false); 
  };

  return (
    <Modal
      title="Create Team"
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
          label="Team"
          name="team"
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder="Frontend" size="large" />
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
