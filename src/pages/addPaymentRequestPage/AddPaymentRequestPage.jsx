import { Button, Col, DatePicker, Flex, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { Wrapper } from "../../common";
import { status, pages, pathname } from "../../enums";
import styles from "./AddPaymentRequestPage.module.scss";
import { employeeInfo, getFolderArr } from "../../utils";
import { v4 as uuidv4 } from "uuid";

export const AddPaymentRequestPage = () => {
  const [form] = Form.useForm();
  const [folderArr, setFolderArr] = useState([]);

  useEffect(() => {
    const savedFolderArr = getFolderArr() || [];
    setFolderArr(savedFolderArr);
  }, []);

  const onFinish = (values) => {
    const newFolderArr = [
      ...folderArr,
      {
        guid: uuidv4(),
        user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
        user_name: employeeInfo().fio,
        title: pages.CREATE_PAYMENT_REQUEST,
        doc_name: values.title,
        process: pathname.CREATE_PAYMENT_REQUEST,
        request_name: values.request_name,
        request_basis: values.request_basis,
        counterparty: values.counterparty,
        amount: values.amount,
        payment_date: values.payment_date,
        budget_item: values.budget_item,
        comments: values.comments,
        folder_name: status.IN_PROCESS,
        count: 12,
        date: values.payment_date,
        status: status.IN_PROCESS,
        employee: { ...employeeInfo() },
      },
    ];

    setFolderArr(newFolderArr);
    localStorage.setItem("folderArr", JSON.stringify(newFolderArr));
    form.resetFields();
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
              label="Название документа"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Input type="text" placeholder="Введите название документа " />
            </Form.Item>
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
          </Col>

          <Col span={12}>
            <Form.Item
              label="Сумма заявки"
              name="amount"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input type="number" placeholder="Введите сумму" />
            </Form.Item>
            <Form.Item
              label="Срок оплаты"
              name="payment_date"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Выберите дату"
              />
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
