import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Modal, Select, SelectProps } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ActionModalProps } from "shared/types";
import { useGetProjectsQuery } from "src/redux/api/projects";
import { useCreateReportMutation } from "src/redux/api/reports";
import { createReportSchema } from "src/validation";

const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
  interface FormType {
    projectId: number;
    reportText: string;
  }
  // const [value, setValue] = useState("");
  const { data: projects } = useGetProjectsQuery();

  console.log(projects);
  const optionsProject: SelectProps["options"] = [];
  projects?.map((project) => {
    optionsProject.push({
      value: project.id,
      label: project.projectName,
    });
  });
  const handleChangeProjects = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(createReportSchema),
  });
  const [createReport] = useCreateReportMutation();
  const onSubmit = (data: FormType) => {
    createReport({
      projectId: getValues().projectId,
      reportText: getValues().reportText,
    });
  };
  return (
    <Modal
      title="Create Report"
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
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item label="Project Name" name="projectId">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={optionsProject}
                placeholder="Furniro"
              />
            )}
            name="projectId"
          />
        </Form.Item>
        {errors.projectId && (
          <span className="errorMsg">{errors.projectId.message}</span>
        )}
        <Form.Item label="Note" name="reportText">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactQuill
                theme="snow"
                value={value}
                //  onChange={setValue}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            name="reportText"
          />
        </Form.Item>
        {errors.reportText && (
          <span className="errorMsg">{errors.reportText.message}</span>
        )}
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
