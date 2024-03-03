import { Button, Form, Input, Select, SelectProps } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useGetProjectsSelectQuery } from "src/redux/api/projects";
import { useGetTeamsQuery } from "src/redux/api/teams";

export default function FilterEmployee({ setQuery }) {
  const optionsTeams: SelectProps["options"] = [];
  const optionsProject: SelectProps["options"] = [];
  const { data: teams } = useGetTeamsQuery();
  const { data: projects } = useGetProjectsSelectQuery();

  if (Array.isArray(teams)) {
    teams?.map((team) => {
      optionsTeams.push({
        value: team.id,
        label: team.teamName,
      });
    });
  }

  projects?.content?.map((project) => {
    optionsProject.push({
      value: project.id,
      label: project.projectName,
    });
  });

  interface FormType {
    firstName: string;
    lastName: string;
    mail: string;
    teamId: number[];
    projectIds: number[];
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
}
