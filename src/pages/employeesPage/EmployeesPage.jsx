import { Button, Card, Flex } from "antd";
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import { Tree, TreeNode } from "react-organizational-chart";
import { useState } from "react";
import styles from "./EmployeesPage.module.scss";
import { DepartmetModal, EmployeeCard, EmployeModal } from "../../components";

export const EmployeesPage = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [openDepartmet, setOpenDepartmet] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);

  const onOpenDepartmet = () => {
    setOpenDepartmet(true);
  };

  const onOpenEmployee = () => {
    setOpenEmployee(true);
  };

  const onAddEmployee = () => {
    setAddEmployee(true);
  };

  const departmentArr = JSON.parse(localStorage.getItem("departmetArr"));
  const employeeArr = JSON.parse(localStorage.getItem("employeeArr"));

  return (
    <Wrapper
      className={styles.content}
      path={pathname.EMPLOYEES}
      title={pages.EMPLOYEES}
      page={true}
    >
      <Flex style={{ height: "600px" }} justify="center">
        <Tree
          lineWidth={"2px"}
          lineColor={"#454f5d"}
          lineBorderRadius={"10px"}
          label={
            <EmployeeCard
              item={{
                fio: "testov test testovich",
                position: "CEO",
                department: "Владелец",
              }}
              onOpen={() => setOpenEmployee(true)}
            />
          }
        >
          {/* <TreeNode
            label={<EmployeeCard onOpen={() => setOpenEmployee(true)} />}
          /> */}
          {/* <TreeNode
            className={styles.wrap}
            label={
              <Button type="primary" onClick={onOpenDepartmet}>
                <AppstoreAddOutlined />
                Добавить отдел
              </Button>
            }
          >
            {departmentArr &&
              departmentArr.map((item) => (
                <TreeNode
                  className={styles.wrap}
                  label={<Card title={item.departmet}></Card>}
                />
              ))}
          </TreeNode> */}

          {/* <TreeNode
            className={styles.wrap}
            label={
              <Button type="primary" onClick={onOpenEmployee}>
                <UserAddOutlined />
                Добавить сотрудника
              </Button>
            }
          > */}
          {employeeArr &&
            employeeArr.map((item) => (
              <TreeNode
                className={styles.wrap}
                label={
                  <EmployeeCard
                    item={item}
                    onOpen={() => setOpenEmployee(true)}
                  />
                }
              />
            ))}
          {/* </TreeNode> */}
        </Tree>
        <DepartmetModal
          open={openDepartmet}
          onCancel={() => setOpenDepartmet(false)}
        />
        <EmployeModal
          open={openEmployee}
          onCancel={() => setOpenEmployee(false)}
        />
      </Flex>
    </Wrapper>
  );
};
