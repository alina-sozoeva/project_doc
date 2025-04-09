import { Form, Input, Select, Row, Col } from "antd";
import { departments, positions } from "../../constants";
import styles from "./StepContent.module.scss";
import { useMemo, useState } from "react";

export const StepContent = ({ count }) => {
  const employeesArr = JSON.parse(localStorage.getItem("employeesArr"));
  const [filters, setFilters] = useState({
    departmentId: undefined,
    positionId: undefined,
  });

  const handleChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredEmployeesArr = useMemo(() => {
    const { departmentId, positionId } = filters;

    if (positionId && departmentId) {
      return employeesArr.filter(
        (item) =>
          item.position === positionId && item.department === departmentId
      );
    }

    if (departmentId) {
      return employeesArr.filter((item) => item.department === departmentId);
    }

    if (positionId) {
      if (positionId === 1 || positionId === 2) {
        return employeesArr;
      }
      return employeesArr.filter((item) => item.position === positionId);
    }

    return employeesArr;
  }, [filters, employeesArr]);

  const updateEmployeesArr = filteredEmployeesArr?.map((item) => ({
    value: item.id,
    label: item.fio,
  }));

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item
          name={`step${count}_department`}
          label="Название отдела"
          className={styles.customFormItem}
          rules={[
            {
              required: true,
              message: `Это обязательное поле для заполнения. Если нет отдела выберите пункт "Нет отдела"`,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Выберите отдел"
            optionFilterProp="label"
            options={departments}
            onChange={(value) => handleChange("departmentId", value)}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name={`step${count}_position`}
          label="Должность участника процесса"
          className={styles.customFormItem}
          rules={[
            {
              required: true,
              message: `Это обязательное поле для заполнения. Если нет должности выберите пункт "Нет должности"`,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Выберите должность участника процесса"
            optionFilterProp="label"
            options={positions}
            onChange={(value) => handleChange("positionId", value)}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name={`step${count}_employee`}
          label="ФИО участника процесса"
          className={styles.customFormItem}
        >
          <Select
            showSearch
            placeholder="Выберите ФИО участника процесса"
            optionFilterProp="label"
            options={updateEmployeesArr}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name={`step${count}_time`}
          label="Cрок рассмотрения (дней)"
          className={styles.customFormItem}
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения",
            },
          ]}
        >
          <Input
            style={{ width: "100%" }}
            type="number"
            placeholder="Введите количество дней"
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
