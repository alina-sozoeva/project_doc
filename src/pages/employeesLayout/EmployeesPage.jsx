import { Flex, Spin } from "antd";
import { Tree } from "react-organizational-chart";
import { useState } from "react";
import { EmployeeCard, EmployeeModal, TreeComponent } from "../../components";
import styles from "./EmployeesLayout.module.scss";
import { useSelector } from "react-redux";
import { useGetEmployeesQuery } from "../../store";
import { pages, pathname } from "../../enums";
import { Wrapper } from "../../common";

export const EmployeesPage = () => {
  const [openEmployee, setOpenEmployee] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const { data, error, isLoading } = useGetEmployeesQuery();

  const addNewEmployee = (id) => {
    setEmployeeId(id);
    setOpenEmployee(true);
  };

  const buildTree = (employees, headId = 1) => {
    return employees
      ?.filter((employee) => employee.head_id == headId)
      .map((employee) => ({
        ...employee,
        children: buildTree(employees, employee.guid),
      }));
  };
  // e13ac7f5-eaff-4f4f-a286-12e584710ff3

  const treeData = buildTree(data?.data, 1);

  return (
    <Wrapper
      className={styles.content}
      path={pathname.EMPLOYEES}
      title={pages.EMPLOYEES}
      page={true}
    >
      <div className={styles.content}>
        {isLoading ? (
          <Flex
            align="center"
            justify="center"
            gap="middle"
            vertical
            style={{ height: "40vh" }}
          >
            <Spin tip="Загрузка...">
              <div style={{ padding: 50 }} />
            </Spin>
          </Flex>
        ) : (
          <Flex justify="center" style={{ width: "100%" }}>
            <div
              style={{
                minWidth: "1200px",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <Tree
                lineWidth={"2px"}
                lineColor={"#454f5d"}
                lineBorderRadius={"10px"}
                label={
                  <EmployeeCard
                    item={data?.data[0]}
                    onOpen={() => addNewEmployee(1)}
                  />
                }
              >
                {treeData.map((item) => (
                  <TreeComponent
                    key={item.guid}
                    node={item}
                    addNewEmployee={() => addNewEmployee(item.guid)}
                  />
                ))}
              </Tree>
            </div>
          </Flex>
        )}
        <EmployeeModal
          open={openEmployee}
          onCancel={() => setOpenEmployee(false)}
          headId={employeeId}
        />
      </div>
    </Wrapper>
  );
};
