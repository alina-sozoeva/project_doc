import { Button, Drawer, Table } from "antd";
import { useEmployeesColums } from "./useEmployeesColums";
import { UserAddOutlined } from "@ant-design/icons";

export const EmployeesDrawer = ({ openEmploe, onOpenEmploe }) => {
  const { columns } = useEmployeesColums()

  return (
    <Drawer
      title="Список сотрудников"
      placement="right"
      open={openEmploe}
      onClose={onOpenEmploe}
      width="100vw"
    >
      <Button>
        <UserAddOutlined />
        Добавить сотрудника
      </Button>
      <Table columns={columns} />
    </Drawer>
  );
};
