import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Modal, Select, SelectProps, message } from "antd";
import React, { useEffect } from "react";
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
  const optionsProject: SelectProps["options"] = [];
  const { data: projects } = useGetProjectsQuery();
  const [createReport, { isSuccess }] = useCreateReportMutation();
  
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(createReportSchema),
  });

  if (Array.isArray(projects)) {
    projects?.map((project) => {
      optionsProject.push({
        value: project?.id,
        label: project?.projectName,
      });
    });
  }

  const onSubmit = (data: FormType) => {
    const strippedReportText = data.reportText.replace(/<[^>]+>/g, "");
    createReport({
      projectId: getValues().projectId,
      reportText: strippedReportText,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      reset();
      message.success("Report created successfully");
    }
  }, [isSuccess]);

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
