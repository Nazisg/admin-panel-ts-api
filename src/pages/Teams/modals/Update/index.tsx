import { Button, Flex, Form, Input, Modal, Select, SelectProps } from "antd";
import { ActionModalProps } from "shared/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTeamSchema } from "src/validation";
import { useEffect } from "react";
import { useGetTeamByIdQuery, useUpdateTeamMutation } from "src/redux/api/teams";
const Update: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen ,selectedTeamId}) => {
  interface FormType {
    name: string;
    teamName:string;
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(createTeamSchema),
  });
  const {data:team} = useGetTeamByIdQuery(selectedTeamId as any)
  console.log(team)
  
  useEffect(() => {
    if (team) {
      reset({
        teamName: team.name,
      });
    }
  }, [team, reset]);
  const [updateTeam] = useUpdateTeamMutation()

    const onSubmit = (formData: FormType) => {
      const requestData = {
        teamName: formData.teamName,
      };
  
      updateTeam({
        id: selectedTeamId,
        ...requestData,
      });
      setModalOpen(false)
    };

  return (
    <Modal
      title="Update Team"
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
            Update
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default Update;
