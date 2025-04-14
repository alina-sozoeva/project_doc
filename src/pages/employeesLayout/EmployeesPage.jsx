import { Flex } from "antd";
import { Tree } from "react-organizational-chart";
import { useState } from "react";
import { EmployeeCard, EmployeeModal, TreeComponent } from "../../components";
import styles from "./EmployeesLayout.module.scss";
import { useSelector } from "react-redux";

export const EmployeesPage = () => {
  const [openEmployee, setOpenEmployee] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const employees = useSelector((state) => state.emloyees.employees);

  const addNewEmployee = (id) => {
    setEmployeeId(id);
    setOpenEmployee(true);
  };

  const buildTree = (employees, headId = 1) => {
    return employees
      ?.filter((employee) => employee.headId === headId)
      .map((employee) => ({
        ...employee,
        children: buildTree(employees, employee.id),
      }));
  };

  const treeData = buildTree(employees, 1);

  return (
    <div className={styles.content}>
      <Flex justify="center" style={{ width: "100%" }}>
        <div
          style={{ minWidth: "1200px", textAlign: "center", padding: "20px" }}
        >
          <Tree
            lineWidth={"2px"}
            lineColor={"#454f5d"}
            lineBorderRadius={"10px"}
            label={
              <EmployeeCard
                item={employees[0]}
                onOpen={() => addNewEmployee(1)}
              />
            }
          >
            {treeData.map((item) => (
              <TreeComponent
                key={item.id}
                node={item}
                addNewEmployee={addNewEmployee}
              />
            ))}
          </Tree>
        </div>
      </Flex>
      <EmployeeModal
        open={openEmployee}
        onCancel={() => setOpenEmployee(false)}
        headId={employeeId}
      />
    </div>
  );
};
