import { Descriptions, Drawer } from "antd";
import { ActionModalProps } from "shared/types";
import { useGetReportByIdQuery } from "src/redux/api/reports";

const View: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedReportId,
}) => {
  const { data: report } = useGetReportByIdQuery(selectedReportId as any);
  return (
    <Drawer
      title="View Employee"
      onClose={() => setModalOpen(false)}
      open={modalOpen}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{report?.firstName}</Descriptions.Item>
        <Descriptions.Item label="Surname">
          {report?.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Project Name">
          {report?.project?.projectName}
        </Descriptions.Item>
        <Descriptions.Item label="Created date">
          {report?.localDateTime.slice(0, 10)}
        </Descriptions.Item>
        <Descriptions.Item label="Note">
          <div dangerouslySetInnerHTML={{ __html: report?.reportText }} />
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default View;
