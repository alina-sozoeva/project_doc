import { Flex } from "antd";
import { Tree, TreeNode } from "react-organizational-chart";
import { useState, useEffect } from "react";
import { EmployeeCard, EmployeModal } from "../../components";
import foto from "../../assets/foto.jpg";
import styles from "./EmployeesPage.module.scss";
import { toast } from "react-toastify";

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
    <div
      className={styles.content}
      style={{
        overflow: "auto",
        width: "100%",
        height: "70vh",
        padding: "20px",
      }}
    >
      <Flex justify="center">
        <Tree
          lineWidth={"2px"}
          lineColor={"#454f5d"}
          lineBorderRadius={"10px"}
          label={
            <EmployeeCard
              item={{
                fio: "Testov Test",
                position: "CEO",
                department: "Владелец",
                photo: foto,
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
        <EmployeModal
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
