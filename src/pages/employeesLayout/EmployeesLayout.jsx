import { Tabs } from "antd";
import styles from "./EmployeesLayout.module.scss";
import { EmployeesPage } from "./EmployeesPage";

export const EmployeesLayout = () => {
  const items = [
    {
      key: "1",
      label: "Сотрудники",
      children: (
        <div className={styles.content}>
          <EmployeesPage />
        </div>
      ),
    },
    // {
    //   key: "2",
    //   label: "Стуктура огранизации",
    //   children: "Content of Tab Pane 1",
    // },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        className={styles.layout}
      />
    </>
  );
};
