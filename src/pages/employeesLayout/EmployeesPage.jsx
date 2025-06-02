import { Flex, Spin } from "antd";
import { Tree } from "react-organizational-chart";
import { useState } from "react";
import { EmployeeCard, EmployeeModal, TreeComponent } from "../../components";
import { useGetEmployeesQuery } from "../../store";
import { pages, pathname } from "../../enums";
import { Wrapper } from "../../common";
import styles from "./EmployeesLayout.module.scss";

export const EmployeesPage = () => {
  const [openEmployee, setOpenEmployee] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const { data, isLoading } = useGetEmployeesQuery();

  const addNewEmployee = (id) => {
    setEmployeeId(id);
    setOpenEmployee(true);
  };

  const buildTree = (employees, headId = 1) => {
    return employees
      ?.filter((employee) => String(employee.head_id) === String(headId))
      .map((employee) => ({
        ...employee,
        children: buildTree(employees, employee.guid),
      }));
  };

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
                    item={data?.data?.find(
                      (item) => item.email === "generalnyi.director@company.com"
                    )}
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
