import { Button, Form, Input, Select, SelectProps } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useGetStatusListQuery } from "src/redux/api/employees";
import { useGetProjectsSelectQuery } from "src/redux/api/projects";
import { useGetTeamsQuery } from "src/redux/api/teams";

interface FilterEmployeeProps {
  setQuery: (query: string) => void;
}
interface FormType {
  firstName: string;
  lastName: string;
  mail: string;
  teamId: number[];
  projectIds: number[];
  status: string;
}

const FilterEmployee: React.FC<FilterEmployeeProps> = ({
  setQuery,
  setModalOpen,
}) => {
  const optionsTeams: SelectProps["options"] = [];
  const optionsProject: SelectProps["options"] = [];
  const optionsStatus: SelectProps["options"] = [];
  const { data: teams } = useGetTeamsQuery();
  const { data: projects } = useGetProjectsSelectQuery();
  const { data: statusList } = useGetStatusListQuery();

  if (Array.isArray(teams)) {
    teams.forEach((team) => {
      optionsTeams.push({
        value: team.id,
        label: team.teamName,
      });
    });
  }

  projects?.content?.forEach((project) => {
    optionsProject.push({
      value: project.id,
      label: project.projectName,
    });
  });

  if (Array.isArray(statusList)) {
    statusList.forEach((status) => {
      optionsStatus.push({
        value: status,
        label: status,
      });
    });
  }

  const { handleSubmit, control } = useForm<FormType>({});
  const onSubmit: SubmitHandler<FormType> = (data) => {
    let fields = [];
    for (const key in data) {
      const value = data[key as keyof FormType];
      if ((typeof value === "string" && value) || typeof value === "number") {
        fields.push(`${key}=${value}`);
      } else if (Array.isArray(value)) {
        fields.push(value.map((id) => `${key}=${id}`).join("&"));
      }
    }
    setQuery(fields.join("&"));
    setModalOpen(false);
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      name="basic"
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item label="Team" name="teamId">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              size="large"
              mode="multiple"
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
      <Form.Item label="Project Name" name="projectIds">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              mode="multiple"
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Furniro"
              options={optionsProject}
            />
          )}
          name="projectIds"
        />
      </Form.Item>
      <Form.Item label="Status" name="status">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="ACTIVE"
              options={optionsStatus}
            />
          )}
          name="status"
        />
      </Form.Item>
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
      <Button type="primary" htmlType="submit" block>
        Filter
      </Button>
    </Form>
  );
};

export default FilterEmployee;
