import { Button, Col, DatePicker, Flex, Form, Input, Row, Select, Typography } from "antd";
import { useState } from "react";
import { Wrapper } from "../../common";
import { status, pages, pathname } from "../../enums";
import styles from "./AddPaymentRequestPage.module.scss";

const { Title } = Typography;

export const AddPaymentRequestPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Заявка на выплату:', values);
    // Здесь можно добавить логику для отправки заявки, например, в API
  };

  return (
    <Wrapper
      className={styles.content}
      path={pathname.CREATE_PAYMENT_REQUEST}
      title={pages.CREATE_PAYMENT_REQUEST}
      page={true}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Наименование заявки"
              name="request_name"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input placeholder="Введите название заявки" />
            </Form.Item>

            <Form.Item
              label="Основание заявки"
              name="request_basis"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Select
                placeholder="Выберите договор"
                options={[
                  { value: "contract1", label: "Договор №123 от 01.01.2023" },
                  { value: "contract2", label: "Договор №456 от 15.03.2023" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Контрагент"
              name="counterparty"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Select
                placeholder="Выберите контрагента"
                options={[
                  { value: "company1", label: "ООО Ромашка" },
                  { value: "company2", label: "АО Василек" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Сумма заявки"
              name="amount"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input type="number" placeholder="Введите сумму" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Срок оплаты"
              name="payment_date"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Выберите дату" />
            </Form.Item>

            <Form.Item
              label="Статья бюджета"
              name="budget_item"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Select
                placeholder="Выберите статью бюджета"
                options={[
                  { value: "marketing", label: "Маркетинг" },
                  { value: "logistics", label: "Логистика" },
                  { value: "salary", label: "Зарплата" },
                  { value: "services", label: "Услуги" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Комментарии" name="comments">
              <Input.TextArea placeholder="Введите дополнительную информацию" />
            </Form.Item>
          </Col>
        </Row>

        <Flex gap="small" justify="end">
          <Button type="primary" htmlType="submit">
            Добавить заявку
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};
