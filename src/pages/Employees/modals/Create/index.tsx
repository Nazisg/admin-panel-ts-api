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
import { useState } from "react";
import { ActionModalProps } from "shared/types";
import { useCreateEmployeeMutation } from "src/redux/api/employees";
import { useGetRolesQuery } from "src/redux/api/roles";
import { useGetTeamsQuery } from "src/redux/api/teams";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
    teamId: string;
  }

  const [createEmployee] = useCreateEmployeeMutation();
  const { data: roles } = useGetRolesQuery();
  const { data: teams } = useGetTeamsQuery();
  const optionsTeams: SelectProps["options"] = [];
  const optionsRole: SelectProps["options"] = [];
  const [formRole, setFormRole] = useState<{
    id: string;
    roleName: string;
  } | null>(null);

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
  console.log(optionsRole)
  const handleChangeTeams = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const handleChangeRole = (
    value: string | string[],
    option: { key: React.Key; label: React.ReactNode }
  ) => {
    const role = {
      id: value,
      roleName: option.label,
    };
    setFormRole(role);

    console.log(`Selected: ${value}, ${option.label}`);
  };

  const formSchema = z.object({
    firstName: z.string().min(1, { message: "Firstname is required" }),
    lastName: z.string().min(1, { message: "Lastname is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    mail: z
      .string()
      .email({ message: "Must be a valid email" })
      .min(1, { message: "Email is required" }),
    team: z.string(),
    role:z.string(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormType) => {
    createEmployee(data);
    console.log(data);
  };
///////////////////////

  return (
    <Modal
      title="Create Employee"
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      footer={[
        <Button key="no" onClick={()=>setModalOpen(false)} >
          Cancel
        </Button>,
      ]}

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
              {errors.firstName && <span>{errors.firstName.message}</span>}
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
              {errors.lastName && <span>{errors.lastName.message}</span>}
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
              {errors.mail && <span>{errors.mail.message}</span>}
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
              {errors.password && <span>{errors.password.message}</span>}
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
              {errors.teamId && <span>{errors.teamId.message}</span>}
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
              {errors.role && <span>{errors.role.message}</span>}
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
