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
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from "src/redux/api/employees";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEmployeeSchema } from "src/validation";
import { useEffect } from "react";

interface FormType {
  firstName: string;
  lastName: string;
  roleId: number | string;
  email: string;
  teamId: number | string;
}

const Update: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedEmployeeId,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(updateEmployeeSchema),
  });

  console.log(errors);

  const [form] = Form.useForm();
  const { data: employee } = useGetEmployeeByIdQuery(selectedEmployeeId as any);

  useEffect(() => {
    if (employee) {
      reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.mail,
        roleId: employee.role?.id || "",
        teamId: employee.team?.id || "",
      });
    }
  }, [employee, reset]);

  const [updateEmployee] = useUpdateEmployeeMutation();

  const { data: roles } = useGetRolesQuery();
  const { data: teams } = useGetTeamsQuery();
  const optionsTeams: SelectProps["options"] = [];
  const optionsRole: SelectProps["options"] = [];

  if (Array.isArray(teams)) {
    teams.forEach((team) => {
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

  const onSubmit = (formData: FormType) => {
    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      roleId: formData.roleId,
      teamId: formData.teamId,
    };

    updateEmployee({
      id: selectedEmployeeId,
      ...requestData,
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
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Name" name="firstName">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="large"
                    placeholder="Nazrin"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name="firstName"
              />
            </Form.Item>
            {errors.firstName && (
              <span className="errorMsg">{errors.firstName.message}</span>
            )}
          </Col>
          <Col span={12}>
            <Form.Item label="Surname" name="lastName">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="large"
                    placeholder="Isgandarova"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name="lastName"
              />
            </Form.Item>
            {errors.lastName && (
              <span className="errorMsg">{errors.lastName.message}</span>
            )}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Mail" name="email">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="large"
                    placeholder="nazrin@crocusoft.az"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
            </Form.Item>
            {errors.email && (
              <span className="errorMsg">{errors.email.message}</span>
            )}
          </Col>
          <Col span={12}>
            <Form.Item label="Role" name="roleId">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={optionsRole}
                    placeholder="Employee"
                  />
                )}
                name="roleId"
              />
            </Form.Item>
            {errors.roleId && (
              <span className="errorMsg">{errors.roleId.message}</span>
            )}
          </Col>
        </Row>
        <Form.Item label="Team" name="teamId">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={optionsTeams}
                placeholder="Frontend"
              />
            )}
            name="teamId"
          />
        </Form.Item>
        {errors.teamId && (
          <span className="errorMsg">{errors.teamId.message}</span>
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
