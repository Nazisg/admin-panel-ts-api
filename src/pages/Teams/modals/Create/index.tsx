import { Button, Flex, Form, Input, Modal } from "antd";
import { ActionModalProps } from "shared/types";
import { useCreateTeamsMutation } from "src/redux/api/teams";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTeamSchema } from "src/validation";
const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
  const [createTeam] = useCreateTeamsMutation();
  interface FormType {
    teamName: string;
  }
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(createTeamSchema),
  });
  const onSubmit = async (data: FormType) => {
    createTeam(data);
    reset();
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
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item label="Team" name="team">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="large"
                placeholder="Frontend"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="teamName"
          />
        </Form.Item>
        {errors.teamName && (
          <span className="errorMsg">{errors.teamName.message}</span>
        )}
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
