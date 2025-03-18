import { Button, Flex, Input, Table } from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { useEmployeesColums } from "./useEmployeesColums";
import { AddEmployeeModal, Wrapper } from "../../common";
import styles from "./EmployeesPage.module.scss";
import { useNavigate } from "react-router-dom";
import { pages, pathname } from "../../enums";
import { useState } from "react";

export const EmployeesPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { columns } = useEmployeesColums();
  const data = JSON.parse(localStorage.getItem("employeesArr"));

  const onClose = () => {
    setOpen(false);
  };
  return (
    <Wrapper
      className={styles.content}
      path={pathname.EMPLOYEES}
      title={pages.EMPLOYEES}
      page={true}
    >
      <Flex justify="space-between">
        <Input
          placeholder="Поиск по ФИО"
          prefix={<SearchOutlined />}
          style={{
            width: "20%",
          }}
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          <UserAddOutlined />
          Добавить сотрудника
        </Button>
      </Flex>

      <Table scroll={{ y: 480 }} dataSource={data} columns={columns} bordered />
      <AddEmployeeModal open={open} onCancel={onClose} />
    </Wrapper>
  );
};
