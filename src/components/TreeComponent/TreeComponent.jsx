import { TreeNode } from "react-organizational-chart";
import styles from "./TreeComponent.module.scss";
import { EmployeeCard } from "../EmployeeCard";

export const TreeComponent = ({ node, addNewEmployee }) => {
  console.log(node, "node");

  return (
    <TreeNode
      className={styles.wrap}
      label={
        <EmployeeCard item={node} onOpen={() => addNewEmployee(node.id)} />
      }
    >
      {node.children.map((child) => (
        <TreeComponent
          key={child.id}
          node={child}
          addNewEmployee={addNewEmployee}
        />
      ))}
    </TreeNode>
  );
};
