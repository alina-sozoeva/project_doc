import { useEffect, useState } from "react";
import { Button, Form, Input, Flex } from "antd";
import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import { useNavigate } from "react-router-dom";
import styles from "./AddEmployeePage.module.scss";

export const AddEmployeePage = () => {
  const [employeesArr, setEmployeesArr] = useState(() => {
    const savedEmployees = localStorage.getItem("employeesArr");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  const [lastGuid, setLastGuid] = useState(() => {
    const savedEmployees = localStorage.getItem("employeesArr");
    return savedEmployees ? JSON.parse(savedEmployees).length : 0;
  });

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    localStorage.setItem("employeesArr", JSON.stringify(employeesArr));
  }, [employeesArr]);

  const onFinish = (values) => {
    const newEmployee = {
      guid: lastGuid + 1,
      user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
      user_name: values.user_name,
      title: values.title,
      date: currentDate,
      folder_name: values.folder_name,
      status: values.status,
      telegram: values.telegram,
      email: values.email,
      position: values.position,
      position_declined: values.position_declined,
      position_kg: values.position_kg,
      position_declined_kg: values.position_declined_kg,
      campus: values.campus,
      signature: values.signature,
    };

    setEmployeesArr((prevEmployees) => [...prevEmployees, newEmployee]); // Добавляем нового сотрудника в массив
    setLastGuid((prevGuid) => prevGuid + 1);
    form.resetFields();
    navigate(pathname.EMPLOYEES);
  };

  return (
    <Wrapper
      path={pathname.EMPLOYEES}
      pathChildter={pathname.ADD_EMPLOYEE}
      title={pages.EMPLOYEES}
      descrip={pages.ADD_EMPLOYEE}
      page={true}
      className={styles.form}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        {/* <Typography.Title>Сотрудники</Typography.Title> */}
        <Flex vertical>
          <Form.Item
            label="ФИО"
            name="user_name"
            rules={[{ required: true, message: "Введите ФИО" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Логин"
            name="folder_name"
            rules={[{ required: true, message: "Введите логин" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Телеграмм" name="telegram">
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Введите корректный email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Должность" name="c">
            <Input />
          </Form.Item>
        </Flex>
        <Flex justify="end">
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};
