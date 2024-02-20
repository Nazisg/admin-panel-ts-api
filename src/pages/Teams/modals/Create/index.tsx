import { Button, Flex, Form, Input, Modal } from "antd";
import { ActionModalProps } from "shared/types";
import { useCreateTeamsMutation } from "src/redux/api/teams";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
  const [form] = Form.useForm(); 
  const [createTeam] = useCreateTeamsMutation();

  const onFinish = async (values: { team: string }) => {
     createTeam({
      teamName: values.team,
    });
    form.resetFields(); 
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
