import { Button, Drawer, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useEmployeesColums } from "./useEmployeesColums";
import { Wrapper } from "../../common";

export const EmployeesPage = () => {
  const { columns } = useEmployeesColums();

  return (
    <Wrapper>
      <Button>
        <UserAddOutlined />
        Добавить сотрудника
      </Button>
      <Table columns={columns} scroll={{ x: 1200 }} bordered />
    </Wrapper>
  );
};
