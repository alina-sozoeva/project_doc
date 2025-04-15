import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../common";
import { pages, status, pathname } from "../../enums";
import styles from "./AddAgreementPage.module.scss";
import { employeeInfo } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addToDocuments, addToNotifications } from "../../store";
import { useState } from "react";

export const AddAgreementPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [statusFolder, setStatusFolder] = useState(status.IN_PROCESS);
  const processesMembers = useSelector(
    (state) => state.processes.processesMembers
  );

  const processes = useSelector((state) => state.processes.processes);

  const filtedArr = processes.find((item) => item.slug === "/purchase-request");

  const filteredProcessesMem = processesMembers.filter(
    (item) => item.process_id === filtedArr.id
  );

  const onFinish = (values) => {
    const newGuid = uuidv4();

    const newAgreementArr = {
      guid: newGuid,
      data: {
        user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
        user_name: employeeInfo().fio,
        contract_number: values.contract_number,
        counterparty: values.counterparty,
        contract_type: values.contract_type,
        creation_date: values.creation_date,
        validity_period: values.validity_period,
        contract_amount: values.contract_amount,
        approval_status: values.approval_status,
        comments: values.comments,
        folder_name: status.IN_PROCESS,
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
    dispatch(addToDocuments([newAgreementArr]));
    form.resetFields();
  };

  return (
    <Wrapper
      className={styles.content}
      path={pathname.CREATE_AGREEMENT}
      title={pages.CREATE_AGREEMENT}
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
              label="Номер договора"
              name="contract_number"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input type="number" placeholder="Введите номер договора" />
            </Form.Item>

            <Form.Item
              label="Дата создания"
              name="creation_date"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Выберите дату"
              />
            </Form.Item>

            <Form.Item
              label="Контрагент"
              name="counterparty"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input placeholder="Введите контрагента" />
            </Form.Item>
            <Form.Item
              label="Файл договора"
              name="contract_file"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Upload>
                <Button>Загрузить файл</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Сумма договора"
              name="contract_amount"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input type="number" placeholder="Введите сумму" />
            </Form.Item>
            <Form.Item
              label="Срок действия"
              name="validity_period"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Выберите срок"
              />
            </Form.Item>

            <Form.Item
              label="Тип договора"
              name="contract_type"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Select
                placeholder="Выберите тип договора"
                options={[
                  { value: "supply", label: "Поставка" },
                  { value: "rent", label: "Аренда" },
                  { value: "services", label: "Услуги" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Статус согласования"
              name="approval_status"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Select
                placeholder="Выберите статус"
                options={[
                  { value: "pending", label: "На согласовании" },
                  { value: "revision", label: "Доработка" },
                  { value: "approved", label: "Согласован" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Комментарии" name="comments">
              <Input.TextArea placeholder="Введите комментарии" />
            </Form.Item>
          </Col>
        </Row>

        <Flex gap="small" justify="end">
          <Button type="default" onClick={() => form.resetFields()}>
            Отмена
          </Button>
          <Button type="primary" htmlType="submit">
            Добавить договор
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};
