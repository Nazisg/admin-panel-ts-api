import { Button, DatePicker, Form, Select, SelectProps } from "antd";
import moment from "moment";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useGetEmployeesQuery } from "src/redux/api/employees";
import { useGetProjectsSelectQuery } from "src/redux/api/projects";
import { useAppSelector } from "src/redux/hooks";

export default function FilterReport({ setQuery, setModalOpen }) {
  const { RangePicker } = DatePicker;
  const optionsProject: SelectProps["options"] = [];
  const optionsEmployees: SelectProps["options"] = [];
  const { data: employees } = useGetEmployeesQuery();
  const { data: projects } = useGetProjectsSelectQuery();
  const role = useAppSelector((state) => state.auth.profile.role.roleName);
  interface FormType {
    userIds: number[];
    startDate: string;
    endDate: string;
    projectIds: number[];
    dates: string[] | null;
  }

  const [selectedDates, setSelectedDates] = useState<moment.Moment[]>([]);

  if (Array.isArray(employees)) {
    employees?.map((employee) => {
      optionsEmployees.push({
        value: employee.id,
        label: employee.fullName,
      });
    });
  }
  projects?.content?.map((project) => {
    optionsProject.push({
      value: project.id,
      label: project.projectName,
    });
  });

  const { handleSubmit, control } = useForm<FormType>({});

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const fields = [];
    if (data.userIds) {
      data.userIds.forEach((userId) => {
        fields.push(`userIds=${userId}`);
      });
    }
    if (Array.isArray(selectedDates) && selectedDates.length === 2) {
      const startDateFormatted = selectedDates[0].format("YYYY-MM-DD");
      const endDateFormatted = selectedDates[1].format("YYYY-MM-DD");
      fields.push(`startDate=${startDateFormatted}`);
      fields.push(`endDate=${endDateFormatted}`);
    }

    if (data.projectIds) {
      data.projectIds.forEach((projectId) => {
        fields.push(`projectIds=${projectId}`);
      });
    }

    setQuery(fields.join("&"));
    setModalOpen(false);
  };

  const handleDateChange = (dates: moment.Moment[]) => {
    setSelectedDates(dates);
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      name="basic"
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item label="Date range" name="dates">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <RangePicker
              onChange={(dates) => {
                onChange(dates);
                handleDateChange(dates);
              }}
              onBlur={onBlur}
              size="large"
            />
          )}
          name="dates"
        />
      </Form.Item>
      {role !== "EMPLOYEE" ? (
        <Form.Item label="Employees" name="userIds">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                mode="multiple"
                size="large"
                placeholder="Nazrin Isgandarova"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={optionsEmployees}
              />
            )}
            name="userIds"
          />
        </Form.Item>
      ) : null}
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

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
}
