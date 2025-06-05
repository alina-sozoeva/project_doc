import { Form, Input, Select, Row, Col } from "antd";
import { departments } from "../../constants";
import { useMemo, useState } from "react";
import styles from "./StepContent.module.scss";
import { positionMap } from "../../enums";
import { useGetEmployeesQuery } from "../../store";

export const StepContent = ({ form }) => {
  const { data: employees } = useGetEmployeesQuery();
  const [filters, setFilters] = useState({
    departmentId: undefined,
    positionId: undefined,
  });

  const positions = useMemo(() => {
    if (!employees?.data) return [];
    return employees.data.map((item) => ({
      value: item.position,
      label: positionMap[item.position],
      department: item.department,
    }));
  }, [employees]);

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

    const safePositions = positions || [];

    const filtered = departmentId
      ? safePositions.filter((item) => item.department === departmentId)
      : safePositions;

    const uniquePositions = filtered.filter(
      (item, index, self) =>
        index === self.findIndex((pos) => pos.value === item.value)
    );

    return uniquePositions;
  }, [filters, positions]);

  const filteredemloyees = useMemo(() => {
    if (!employees?.data) return [];

    const { departmentId, positionId } = filters;

    if (positionId && departmentId) {
      return employees.data.filter(
        (item) =>
          item.position === positionId && item.department === departmentId
      );
    }

    if (departmentId) {
      return employees.data.filter((item) => item.department === departmentId);
    }

    if (positionId) {
      return employees.data.filter((item) => item.position === positionId);
    }

    return employees.data;
  }, [filters, employees?.data]);

  const updateemloyees = filteredemloyees?.map((item) => ({
    value: item.guid,
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
            options={filteredPosition || []}
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
            options={updateemloyees || []}
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
