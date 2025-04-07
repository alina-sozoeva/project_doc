import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../common";
import { pages, status, pathname } from "../../enums";
import styles from "./AddAgreementPage.module.scss";
import { employeeInfo } from "../../utils";

const { Title } = Typography;

export const AddAgreementPage = () => {
  const [form] = Form.useForm();
  const [agreementArr, setAgreementArr] = useState([]);

  useEffect(() => {
    const savedAgreementArr =
      JSON.parse(localStorage.getItem("agreementArr")) || [];
    setAgreementArr(savedAgreementArr);
  }, []);

  const onFinish = (values) => {
    const newAgreementArr = [
      ...agreementArr,
      {
        guid: uuidv4(),
        title: values.contract_number,
        counterparty: values.counterparty,
        contract_type: values.contract_type,
        creation_date: values.creation_date,
        validity_period: values.validity_period,
        contract_amount: values.contract_amount,
        approval_status: values.approval_status,
        comments: values.comments,
        status: status.DRAFT,
        process: pathname.CREATE_AGREEMENT,
        employee: { ...employeeInfo() },
      },
    ];

    setAgreementArr(...newAgreementArr);
    localStorage.setItem("folderArr", JSON.stringify(newAgreementArr));
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
              label="Сумма договора"
              name="contract_amount"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input type="number" addonAfter="₽" placeholder="Введите сумму" />
            </Form.Item>
          </Col>

          <Col span={12}>
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
              label="Файл договора"
              name="contract_file"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Upload>
                <Button>Загрузить файл</Button>
              </Upload>
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
