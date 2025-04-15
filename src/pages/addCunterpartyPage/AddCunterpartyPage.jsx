import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
import { pages, pathname, status } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../common";
import { employeeInfo } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addToDocuments, addToNotifications } from "../../store";
import styles from "./AddCunterpartyPage.module.scss";
import { useState } from "react";

export const AddCunterpartyPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [statusFolder, setStatusFolder] = useState(status.IN_PROCESS);
  const processesMembers = useSelector(
    (state) => state.processes.processesMembers
  );

  const processes = useSelector((state) => state.processes.processes);

  const filtedArr = processes.find(
    (item) => item.slug === "/create-counterparty"
  );

  const filteredProcessesMem = processesMembers.filter(
    (item) => item.process_id === filtedArr.id
  );

  console.log(filteredProcessesMem);

  const onFinish = (values) => {
    const newGuid = uuidv4();

    const newFolderArr = {
      guid: newGuid,

      data: {
        user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
        user_name: employeeInfo().fio,
        name: values.name,
        doc_name: values.title,
        description: values.comment,
        folder_name: status.IN_PROCESS,
        date: values.end_date,
      },
      status: statusFolder,
      process_id: filteredProcessesMem[0]?.process_id,
      employee: { ...employeeInfo() },
    };

    dispatch(
      addToNotifications([
        {
          id: uuidv4(),
          user_id: employeeInfo().id,
          doc_id: newGuid,
          status: false,
          comment: "",
          folder_status: statusFolder,
          member_id: filteredProcessesMem[0]?.employee_id,
          step: filteredProcessesMem[0]?.step_index,
          department_id: filteredProcessesMem[0]?.department_id,
          position_id: filteredProcessesMem[0]?.position_id,
          process_id: filteredProcessesMem[0]?.process_id,
        },
      ])
    );

    dispatch(addToDocuments([newFolderArr]));
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
