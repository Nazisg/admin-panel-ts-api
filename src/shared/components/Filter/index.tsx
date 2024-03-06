import { Drawer } from "antd";
import { FilterEmployee, FilterProject, FilterReport } from "shared/index";
import { FilterProps } from "shared/types";

const Filter: React.FC<FilterProps> = ({
  modalOpen,
  setModalOpen,
  statusType,
  setQuery,
}) => {
  const status = {
    employee: <FilterEmployee setQuery={setQuery} setModalOpen={setModalOpen} />,
    project: <FilterProject setQuery={setQuery} setModalOpen={setModalOpen} />,
    report: <FilterReport setQuery={setQuery} setModalOpen={setModalOpen}/>,
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
