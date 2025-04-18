import { Form, Input, Select, Row, Col } from "antd";
import { departments } from "../../constants";
import { useMemo, useState } from "react";
import styles from "./StepContent.module.scss";
import { useSelector } from "react-redux";
import { positionMap } from "../../enums";

export const StepContent = ({ form }) => {
  const employees = useSelector((state) => state.employees.employees);
  const [filters, setFilters] = useState({
    departmentId: undefined,
    positionId: undefined,
  });

  console.log(employees);

  const positions = employees.map((item) => ({
    value: item.position,
    label: positionMap[item.position],
    department: item.department,
  }));

  const handleChange = (type, value) => {
    setFilters((prev) => {
      if (type === "departmentId") {
        return {
          departmentId: value,
          positionId: undefined,
        };
      }

      return { ...prev, [type]: value };
    });

    if (type === "departmentId") {
      form.setFieldsValue({
        position_id: undefined,
        employee_id: undefined,
      });
    }

    if (type === "positionId") {
      form.setFieldsValue({
        employee_id: undefined,
      });
    }
  };

  const filteredPosition = useMemo(() => {
    const { departmentId } = filters;

    const filtered = departmentId
      ? positions.filter((item) => item.department === departmentId)
      : positions;

    const uniquePositions = filtered.filter(
      (item, index, self) =>
        index === self.findIndex((pos) => pos.value === item.value)
    );

    return uniquePositions;
  }, [filters, positions]);

  console.log(filteredPosition);

  const filteredemloyees = useMemo(() => {
    const { departmentId, positionId } = filters;

    if (positionId && departmentId) {
      return employees.filter(
        (item) =>
          item.position === positionId && item.department === departmentId
      );
    }

    if (departmentId) {
      return employees.filter((item) => item.department === departmentId);
    }

    if (positionId) {
      return employees.filter((item) => item.position === positionId);
    }

    return employees;
  }, [filters, employees]);

  console.log(filteredemloyees);

  const updateemloyees = filteredemloyees?.map((item) => ({
    value: item.id,
    label: item.fio,
  }));

  return (
    <Row gutter={16} key="step_index">
      <Col span={6}>
        <Form.Item
          name="department_id"
          label="Название отдела"
          rules={[
            {
              required: true,
              message: `Это обязательное поле для заполнения.`,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Выберите отдел"
            options={departments}
            onChange={(value) => handleChange("departmentId", value)}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name="position_id"
          label="Должность участника процесса"
          className={styles.customFormItem}
          rules={[
            {
              required: true,
              message: `Это обязательное поле для заполнения.`,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Выберите должность участника процесса"
            optionFilterProp="label"
            options={filteredPosition}
            onChange={(value) => handleChange("positionId", value)}
            disabled={!filters.departmentId}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name="employee_id"
          label="ФИО участника процесса"
          className={styles.customFormItem}
          rules={[
            {
              required: true,
              message: `Это обязательное поле для заполнения.`,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Выберите ФИО участника процесса"
            optionFilterProp="label"
            options={updateemloyees}
            disabled={!filters.positionId}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name="time_limit"
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
            style={{ width: "180px" }}
            type="number"
            placeholder="Введите количество дней"
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
