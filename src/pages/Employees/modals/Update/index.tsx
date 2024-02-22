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
  role: {
    id: string;
    roleName: string;
  };
  mail: string;
  teamId: string;
}

const Update: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedEmployeeId,
}) => {
  const [form] = Form.useForm(); // Initialize form

  const { data: employee, isLoading } =
    useGetEmployeeByIdQuery(selectedEmployeeId);

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        mail: employee.mail,
        role: employee.role ? employee.role.id : "", // Assuming role is optional
        teamId: employee.team ? employee.team.id : "", // Assuming team is optional
      });
    }
  }, [employee, form]);

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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(updateEmployeeSchema),
  });

  const onSubmit = (formData: FormType) => {
    updateEmployee({
      id: selectedEmployeeId,
      ...formData,
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
