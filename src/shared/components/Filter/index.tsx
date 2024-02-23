import { DatePicker, Drawer, Form, Input, Select, SelectProps } from "antd";
import { FilterProps } from "shared/types";
import { useGetEmployeesQuery } from "src/redux/api/employees";
import { useGetProjectsQuery } from "src/redux/api/projects";
import { useGetTeamsQuery } from "src/redux/api/teams";

const Filter: React.FC<FilterProps> = ({
  modalOpen,
  setModalOpen,
  statusType,
}) => {
  const { RangePicker } = DatePicker;
  const optionsTeams: SelectProps["options"] = [];
  const optionsProject: SelectProps["options"] = [];
  const optionsEmployees: SelectProps["options"] = [];
  const { data: teams } = useGetTeamsQuery();
  const { data: projects } = useGetProjectsQuery();
  const { data: employees } = useGetEmployeesQuery();

  if (Array.isArray(teams)) {
    teams?.map((team) => {
      optionsTeams.push({
        value: team.id,
        label: team.teamName,
      });
    });
  }
  if (Array.isArray(projects)) {
    projects?.map((project) => {
      optionsProject.push({
        value: project.id,
        label: project.projectName,
      });
    });
  }
  if (Array.isArray(employees)) {
    employees?.map((employee) => {
      optionsEmployees.push({
        value: employee.id,
        label: employee.fullName,
      });
    });
  }
  const handleChangeTeams = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  const handleChangeProjects = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  const handleChangeEmployees = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  // const onFinish = (values) => {
  //   console.log(values)
  // }

  const status = {
    employee: (
      <>
        <Form
          // onFinish={onFinish}
          name="basic"
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item label="Teams" name="teams">
            <Select
              mode="tags"
              size="large"
              onChange={handleChangeTeams}
              placeholder="Frontend"
              options={optionsTeams}
            />
          </Form.Item>
          <Form.Item label="Project Name" name="projectName">
            <Select
              mode="tags"
              size="large"
              placeholder="Furniro"
              onChange={handleChangeProjects}
              options={optionsProject}
            />
          </Form.Item>
          <Form.Item label="Name" name="firstName">
            <Input placeholder="Nazrin" size="large" />
          </Form.Item>
          <Form.Item label="Surname" name="lastName">
            <Input placeholder="Isgandarova" size="large" />
          </Form.Item>
        </Form>
      </>
    ),
    team: (
      <>
        <Form name="basic" autoComplete="off" layout="vertical">
          <Form.Item label="Team " name="teamName">
            <Input placeholder="Frontend" size="large" />
          </Form.Item>
        </Form>
      </>
    ),
    project: (
      <>
        <Form name="basic" autoComplete="off" layout="vertical">
          <Form.Item label="Project Name" name="projectName">
            <Input placeholder="Furniro" size="large" />
          </Form.Item>
        </Form>
      </>
    ),
    report: (
      <>
        <Form name="basic" autoComplete="off" layout="vertical">
          <Form.Item label="Date range" name="date">
            <RangePicker size="large" />
          </Form.Item>

          <Form.Item label="Project Name" name="projectName">
            <Select
              mode="tags"
              size="large"
              placeholder="Furniro"
              onChange={handleChangeProjects}
              options={optionsProject}
            />
          </Form.Item>
          <Form.Item label="Employees" name="employees">
            <Select
              mode="tags"
              size="large"
              placeholder="Nazrin Isgandarova"
              onChange={handleChangeEmployees}
              options={optionsEmployees}
            />
          </Form.Item>
        </Form>
      </>
    ),
  };

  return (
    <Drawer title="Filter" onClose={() => setModalOpen(false)} open={modalOpen}>
      {
        //@ts-ignore
        status[statusType]
      }
    </Drawer>
  );
};

export default Filter;
