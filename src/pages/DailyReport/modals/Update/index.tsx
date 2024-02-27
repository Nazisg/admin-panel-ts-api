import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Modal } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ActionModalProps } from "shared/types";
import {
  useGetReportByIdQuery,
  useUpdateReportMutation,
} from "src/redux/api/reports";
import { createReportSchema } from "src/validation";

const Update: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedReportId,
}) => {
  interface FormType {
    reportText: string;
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(createReportSchema),
  });
  const { data: report } = useGetReportByIdQuery(selectedReportId as number);
  console.log(report);
  const [updateReport] = useUpdateReportMutation();
  useEffect(() => {
    if (report) {
      reset({
        reportText: report?.reportText,
      });
    }
  }, [report, reset]);
  const onSubmit = (formData: FormType) => {
    // updateReport({
      //   id: selectedReportId,
      //   reportText: formData.reportText,
      // });
      
      const requestData = {
        teamName: formData.reportText,
      };
    
      updateReport({
        id: selectedReportId,
        ...requestData,
      });
      console.log(formData.reportText);
      setModalOpen(false);
  };
  return (
    <Modal
      title="Update Report"
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
            Update
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default Update;
