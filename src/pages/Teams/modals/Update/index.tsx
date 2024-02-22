import { Button, Flex, Form, Input, Modal, Select, SelectProps } from "antd";
import { ActionModalProps } from "shared/types";
import { useGetEmployeesQuery } from "src/redux/api/employees";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const Update: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
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
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Team"
          name="teams"
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder="Frontend" size="large" />
        </Form.Item>
        <Form.Item
          label="Employees"
          name="employees"
          rules={[{ required: true, message: "" }]}
        >
          <Select
            mode="tags"
            size="large"
            placeholder="Nazrin Isgandarova"
            // onChange={handleChangeEmployees}
            options={optionsEmployees}
          />
        </Form.Item>

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
