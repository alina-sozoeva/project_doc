import { Flex } from "antd";
import { Tree } from "react-organizational-chart";
import { useState, useEffect } from "react";
import { EmployeeCard, EmployeeModal, TreeComponent } from "../../components";
import { v4 as uuidv4 } from "uuid";
import foto from "../../assets/foto.jpg";
import styles from "./EmployeesLayout.module.scss";

const defaultEmployees = [
  {
    id: uuidv4(),
    fio: "Generalnyi Director",
    email: "generalnyi.director@company.com",
    position: 9,
    department: "CEO",
    photo: foto,
    phone_number: "+(996)700-00-00-00",
  },
];

export const EmployeesPage = () => {
  const [openEmployee, setOpenEmployee] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [employeesArr, setEmployeeArr] = useState(() => {
    const saved = localStorage.getItem("employeesArr");
    return saved ? JSON.parse(saved) : defaultEmployees;
  });

  useEffect(() => {
    localStorage.setItem("employeesArr", JSON.stringify(employeesArr));
  }, [employeesArr]);

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

  const treeData = buildTree(employeesArr, 1);

  const add = (newNews) => {
    const updatedNewsArr = [...employeesArr, newNews];
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
                item={employeesArr[0]}
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
        add={add}
      />
    </div>
  );
};
