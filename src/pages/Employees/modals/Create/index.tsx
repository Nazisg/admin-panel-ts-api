import { zodResolver } from "@hookform/resolvers/zod";
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
  message,
} from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActionModalProps } from "shared/types";
import { useCreateEmployeeMutation } from "src/redux/api/employees";
import { useGetRolesQuery } from "src/redux/api/roles";
import { useGetTeamsQuery } from "src/redux/api/teams";
import { useAppSelector } from "src/redux/hooks";
import { createEmployeeSchema } from "src/validation";

const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
  interface FormType {
    firstName: string;
    lastName: string;
    password: string;
    role: {
      id: string;
      roleName: string;
    };
    mail: string;
    teamId: number | null | string;
  }

  const [createEmployee, { isSuccess }] = useCreateEmployeeMutation();
  const { data: roles } = useGetRolesQuery();
  const { data: teams } = useGetTeamsQuery();
  const optionsTeams: SelectProps["options"] = [];
  const optionsRole: SelectProps["options"] = [];
  const role = useAppSelector((state) => state.auth.profile.role.roleName);

  if (Array.isArray(teams)) {
    teams?.map((team) => {
      optionsTeams.push({
        value: team.id,
        label: team.teamName,
      });
    });
  }

  const filteredRoles = roles
    ? role === "SUPER_ADMIN"
      ? roles?.filter(
          (role: { id: number; roleName: string }) =>
            role.id > 1 && role.id !== 3
        )
      : role === "ADMIN"
      ? roles.filter((role: { id: number }) => role.id > 3)
      : []
    : [];

  if (Array.isArray(filteredRoles)) {
    filteredRoles.map((role) => {
      optionsRole.push({
        value: role.id,
        label: role.roleName,
      });
    });
  }
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(createEmployeeSchema),
  });

  const onSubmit = () => {
    const selectedRole = roles?.find(
      (role: { id: string; roleName: string }) =>
        Number(role.id) === getValues().role
    );
    createEmployee({
      firstName: getValues().firstName,
      lastName: getValues().lastName,
      password: getValues().password,
      role: selectedRole,
      mail: getValues().mail,
      teamId: getValues().teamId,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      reset();
      message.success("Employee added successfully");
    }
  }, [isSuccess]);

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
        onFinish={handleSubmit(onSubmit)}
        name="basic"
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
            <Form.Item label="Mail" name="mail">
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
                name="mail"
              />
            </Form.Item>
            {errors.mail && (
              <span className="errorMsg">{errors.mail.message}</span>
            )}
          </Col>
          <Col span={12}>
            <Form.Item label="Password" name="password">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Password
                    size="large"
                    placeholder="********"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name="password"
              />
            </Form.Item>
            {errors.password && (
              <span className="errorMsg">{errors.password.message}</span>
            )}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item label="Role" name="role">
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
                name="role"
              />
            </Form.Item>
            {errors.role && (
              <span className="errorMsg">{errors.role.message}</span>
            )}
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
