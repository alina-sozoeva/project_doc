import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
import { pages, pathname, status } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Wrapper } from "../../common";
import styles from "./AddCunterpartyPage.module.scss";
import { employeeInfo, getFolderArr } from "../../utils";

export const AddCunterpartyPage = () => {
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
        name: values.name,
        doc_name: values.title,
        title: pages.CREATE_COUNTERPARTY,
        description: values.comment,
        folder_name: status.IN_PROCESS,
        count: 12,
        date: values.end_date,
        status: status.IN_PROCESS,
        process: pathname.CREATE_COUNTERPARTY,
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
      path={pathname.CREATE_COUNTERPARTY}
      title={pages.CREATE_COUNTERPARTY}
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
              label="Юридическое наименование компании"
              name="company_name"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Input placeholder="Введите юридическое наименование компании" />
            </Form.Item>

            <Form.Item label="ИНН" name="inn">
              <Input placeholder="Введите ИНН" type="number" />
            </Form.Item>

            <Form.Item label="Юридический адрес" name="legal_address">
              <Input placeholder="Введите юридический адрес" />
            </Form.Item>

            <Form.Item label="Фактический адрес" name="actual_address">
              <Input placeholder="Введите фактический адрес" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Контактное лицо"
              name="contact_person"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Input placeholder="Введите ФИО контактного лица" />
            </Form.Item>
            <Form.Item
              label="Номер телефона"
              name="phone"
              rules={[{ required: true, message: "Введите номер телефона" }]}
            >
              <Input placeholder="Введите номер телефона" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: "email", message: "Введите корректный email" }]}
            >
              <Input placeholder="Введите email" />
            </Form.Item>

            <Form.Item
              label="Банковские реквизиты"
              name="bank_details"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Input placeholder="Введите банковские реквизиты" />
            </Form.Item>

            <Form.Item
              label="Статус проверки"
              name="verification_status"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
            >
              <Select
                placeholder="Выберите статус проверки"
                options={[
                  { value: "jack", label: "ожидание" },
                  { value: "lucy", label: "проверено" },
                  { value: "Yiminghe", label: "отклонено" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Flex gap="small" justify="end">
          {/* <Button type="default">Отмена</Button> */}
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};
