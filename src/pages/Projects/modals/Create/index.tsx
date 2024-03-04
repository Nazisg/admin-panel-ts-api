import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Input, Modal, Select, SelectProps } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ActionModalProps } from "shared/types";
import { useGetEmployeesQuery } from "src/redux/api/employees";
import { useCreateProjectMutation } from "src/redux/api/projects";
import { createProjectSchema } from "src/validation";

const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
  const [createProject] = useCreateProjectMutation();
  const { data: employees } = useGetEmployeesQuery();
  const optionsEmployees: SelectProps["options"] = [];

  interface ProjectType {
    projectName: string;
    userIds: number[];
  }
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ProjectType>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = () => {
    createProject({
      projectName: getValues().projectName,
      userIds: getValues().userIds,
    });
    reset();
    setModalOpen(false);
  };

  if (Array.isArray(employees)) {
    employees.map((employee) => {
      optionsEmployees.push({
        value: employee.id,
        label: employee.fullName,
      });
    });
  }

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
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item label="Project Name" name="projectName">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="large"
                placeholder="Plast"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="projectName"
          />
        </Form.Item>
        {errors.projectName && (
          <span className="errorMsg">{errors.projectName.message}</span>
        )}
        <Form.Item label="Employees" name="userIds">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                mode="multiple"
                size="large"
                placeholder="Nazrin Isgandarova"
                options={optionsEmployees}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="userIds"
          />
        </Form.Item>
        {errors.userIds && (
          <span className="errorMsg">{errors.userIds.message}</span>
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
