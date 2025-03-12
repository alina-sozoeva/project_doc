import { Button, Flex, Input, Table } from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { useEmployeesColums } from "./useEmployeesColums";
import { Wrapper } from "../../common";
import styles from "./EmployeesPage.module.scss";
import { useNavigate } from "react-router-dom";

export const EmployeesPage = () => {
  const navigate = useNavigate();

  const { columns } = useEmployeesColums();

  return (
    <Wrapper className={styles.content}>
      <Flex justify="space-between">
        <Input
          placeholder="Поиск по ФИО"
          prefix={<SearchOutlined />}
          style={{
            width: "20%",
          }}
        />
        <Button type="primary" onClick={() => navigate("/add-employee")}>
          <UserAddOutlined />
          Добавить сотрудника
        </Button>
      </Flex>

      <Table columns={columns} scroll={{ x: 1200 }} bordered />
    </Wrapper>
  );
};
