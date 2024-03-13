import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  SelectProps,
  message,
} from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActionModalProps } from "shared/types";
import { useGetEmployeesQuery } from "src/redux/api/employees";
import {
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
} from "src/redux/api/teams";
import { createTeamSchema } from "src/validation";
const Update: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedTeamId,
}) => {
  interface FormType {
    name: string;
    teamName: string;
    employees: number[];
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormType>({
    resolver: zodResolver(createTeamSchema),
  });
  const { data: team } = useGetTeamByIdQuery(selectedTeamId as any);
  const { data: employees } = useGetEmployeesQuery();
  const optionsEmployees: SelectProps["options"] = [];

  if (Array.isArray(employees)) {
    employees?.map((employee) => {
      optionsEmployees.push({
        value: employee.id,
        label: employee.fullName,
      });
    });
  }
  useEffect(() => {
    if (team) {
      reset({
        teamName: team.name,
        employees: team.users?.map((user) => user.id),
        // employees: team.users?.filter(user => user.status === "ACTIVE").map(user => user.id),
      });
    }
  }, [team, reset]);

  const [updateTeam, { isSuccess }] = useUpdateTeamMutation();
  const onSubmit = () => {
    const values = getValues();
    updateTeam({
      id: selectedTeamId,
      addId: values.employees,
      teamName: values.teamName,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      message.success("Team updated successfully");
    }
  }, [isSuccess]);
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
        <Form.Item label="Team" name="teamName">
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
        <Form.Item label="Employees" name="employees">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                mode="multiple"
                size="large"
                placeholder="Nazrin Isgandarova"
                onChange={onChange}
                options={optionsEmployees}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="employees"
          />
        </Form.Item>
        {errors.employees && (
          <span className="errorMsg">{errors.employees.message}</span>
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
