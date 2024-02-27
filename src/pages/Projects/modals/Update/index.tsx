import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Input, Modal, Select, SelectProps } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActionModalProps } from "shared/types";
import { useGetEmployeesQuery } from "src/redux/api/employees";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "src/redux/api/projects";
import { createProjectSchema } from "src/validation";

const Update: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedProjectId,
}) => {
  interface FormType {
    projectName: string;
    employees:string[];

    userIdsToAdd:any; //change
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(createProjectSchema),
  });
  const { data: employees } = useGetEmployeesQuery();
  const { data: project } = useGetProjectByIdQuery(selectedProjectId as any);
  const optionsEmployees: SelectProps["options"] = [];

  if (Array.isArray(employees)) {
    employees?.map((employee) => {
      optionsEmployees.push({
        value: employee.id,
        label: employee.fullName,
      });
    });
  }
  const [updateProject] = useUpdateProjectMutation();
  useEffect(() => {
    if (project) {
      reset({
        projectName: project.projectName,
        employees:project.users?.map(user=>user.id)
      });
    }
  }, [project, reset]);
  const onSubmit = (formData: FormType) => {
    updateProject({
      id: selectedProjectId,
		//  userIdsToAdd: formData.userIdsToAdd,
			projectName: formData.projectName,

    });
    setModalOpen(false);
  };

  return (
    <Modal
      title="Update Project"
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

        <Form.Item label="Employees" name="employees">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                mode="tags"
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
