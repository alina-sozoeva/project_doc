import { Button, Form, Input, Row, Col } from "antd";
import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import { useNavigate } from "react-router-dom";
import styles from './AddEmployeePage.module.scss'

export const AddEmployeePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate(pathname.EMPLOYEES);
  };

  return (
    <Wrapper
      path={pathname.ADD_EMPLOYEE}
      title={pages.ADD_EMPLOYEE}
      page={true}
      className={styles.form}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="ФИО"
              name="user_name"
              rules={[{ required: true, message: "Введите ФИО" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Склонение ФИО" name="title">
              <Input />
            </Form.Item>

            <Form.Item label="Склонение ФИО KG" name="date">
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
              name="status"
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
          </Col>

          <Col span={12}>
            <Form.Item label="Должность" name="position">
              <Input />
            </Form.Item>

            <Form.Item label="Склонение должности" name="position_declined">
              <Input />
            </Form.Item>

            <Form.Item label="Должность KG" name="position_kg">
              <Input />
            </Form.Item>

            <Form.Item
              label="Склонение должности KG"
              name="position_declined_kg"
            >
              <Input />
            </Form.Item>

            <Form.Item label="Кампус" name="campus">
              <Input />
            </Form.Item>

            <Form.Item label="Подпись" name="signature">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
