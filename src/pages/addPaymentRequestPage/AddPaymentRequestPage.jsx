import { Button, Col, DatePicker, Flex, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { Wrapper } from "../../common";
import { status, pages, pathname } from "../../enums";
import styles from "./AddPaymentRequestPage.module.scss";
import { employeeInfo } from "../../utils";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addToDocuments, addToNotifications } from "../../store";

export const AddPaymentRequestPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [statusFolder, setStatusFolder] = useState(status.IN_PROCESS);
  const processesMembers = useSelector(
    (state) => state.processes.processesMembers
  );

  const processes = useSelector((state) => state.processes.processes);

  const filtedArr = processes.find((item) => item.slug === "/payment-request");

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
        doc_name: values.title,
        request_name: values.request_name,
        request_basis: values.request_basis,
        counterparty: values.counterparty,
        amount: values.amount,
        payment_date: values.payment_date,
        budget_item: values.budget_item,
        comments: values.comments,
        folder_name: status.IN_PROCESS,
        date: values.payment_date,
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
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setStatusFolder(status.IN_PROCESS)}
          >
            Добавить заявку
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};
