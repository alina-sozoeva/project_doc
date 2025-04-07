import { Button, Col, DatePicker, Flex, Form, Input, Row, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../common";
import { status, pages, pathname } from "../../enums";
import styles from "./AddPurchaseRequestPage.module.scss";

const { Title } = Typography;

export const AddPurchaseRequestPage = () => {
  const [form] = Form.useForm();
  const [folderArr, setFolderArr] = useState([]);

  useEffect(() => {
    const savedFolderArr = JSON.parse(localStorage.getItem("folderArr")) || [];
    setFolderArr(savedFolderArr);
  }, []);

  const onFinish = (values) => {
    const newFolderArr = [
      ...folderArr,
      {
        guid: uuidv4(),
        user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
        user_name: "Leon Kennady",
        title: values.name,
        description: values.comment,
        folder_name: status.DRAFT,
        count: 12,
        date: values.end_date,
        status: status.IN_PROCESS,
      },
    ];

    setFolderArr(newFolderArr);
    localStorage.setItem("folderArr", JSON.stringify(newFolderArr));
    form.resetFields();
  };

  return (
    <Wrapper
      className={styles.content}
      path={pathname.CREATE_PURCHASE_REQUEST}
      title={pages.CREATE_PURCHASE_REQUEST}
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
              label="Наименование запускаемого процесса"
              name="name"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input placeholder="Введите наименование" />
            </Form.Item>

            <Form.Item
              label="Основание заявки"
              name="application"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input placeholder="Введите основание заявки" />
            </Form.Item>

            <Form.Item
              label="Контрагент"
              name="counterparty"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input placeholder="Введите контрагента" />
            </Form.Item>

            <Form.Item
              label="Сумма заявки"
              name="application_amount"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input type="number" placeholder="Введите сумму" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Крайний срок проведения"
              name="end_date"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Выберите дату" />
            </Form.Item>

            <Form.Item
              label="Бюджетная статья"
              name="budget"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Select
                placeholder="Выберите бюджетную статью"
                options={[
                  { value: "true", label: "Бюджет" },
                  { value: "false", label: "Вне бюджета" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Комментарии" name="comment">
              <Input placeholder="Введите комментарий" />
            </Form.Item>
          </Col>
        </Row>

        <Flex gap="small" justify="end">
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};
