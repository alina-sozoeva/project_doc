import { Flex } from "antd";
import { Tree, TreeNode } from "react-organizational-chart";
import { useState, useEffect } from "react";
import { EmployeeCard, EmployeeModal } from "../../components";
import foto from "../../assets/foto.jpg";
import styles from "./EmployeesLayout.module.scss";

export const EmployeesPage = () => {
  const [openEmployee, setOpenEmployee] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeArr, setEmployeeArr] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("employeesArr")) || [];
    setEmployeeArr(storedData);
  }, []);

  const addNewEmployee = (id) => {
    setEmployeeId(id);
    setOpenEmployee(true);
  };

  const buildTree = (employees, headId = 1) => {
    return employees
      .filter((employee) => employee.headId === headId)
      .map((employee) => ({
        ...employee,
        children: buildTree(employees, employee.id),
      }));
  };

  const treeData = buildTree(employeeArr, 1);

  const add = (newNews) => {
    const updatedNewsArr = [...employeeArr, newNews];
    setEmployeeArr(updatedNewsArr);
  };

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
                item={{
                  fio: "Testov Test",
                  position: 2,
                  department: 16,
                  photo: foto,
                  email: "testov@gmail.com",
                  phone_number: "+(996)700-00-00-00",
                }}
                onOpen={() => addNewEmployee(1)}
              />
            }
          >
            {treeData.map((item) => (
              <TreeNodeComponent
                key={item.id}
                node={item}
                addNewEmployee={addNewEmployee}
              />
            ))}
          </Tree>
        </div>
        <EmployeeModal
          open={openEmployee}
          onCancel={() => setOpenEmployee(false)}
          headId={employeeId}
          add={add}
        />
      </Flex>
    </div>
  );
};

const TreeNodeComponent = ({ node, addNewEmployee }) => {
  return (
    <TreeNode
      className={styles.wrap}
      label={
        <EmployeeCard item={node} onOpen={() => addNewEmployee(node.id)} />
      }
    >
      {node.children.map((child) => (
        <TreeNodeComponent
          key={child.id}
          node={child}
          addNewEmployee={addNewEmployee}
        />
      ))}
    </TreeNode>
  );
};
