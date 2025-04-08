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
    const savedFolderArr = JSON.parse(localStorage.getItem("folderArr")) || [];
    setAgreementArr(savedFolderArr);
  }, []);

  const onFinish = (values) => {
    const newAgreementArr = [
      ...agreementArr,
      {
        guid: uuidv4(),
        user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
        user_name: employeeInfo().fio,
        title: pages.CREATE_AGREEMENT,
        process: pathname.CREATE_AGREEMENT,
        contract_number: values.contract_number,
        counterparty: values.counterparty,
        contract_type: values.contract_type,
        creation_date: values.creation_date,
        validity_period: values.validity_period,
        contract_amount: values.contract_amount,
        approval_status: values.approval_status,
        comments: values.comments,
        folder_name: status.IN_PROCESS,
        status: status.IN_PROCESS,
        process: pathname.CREATE_AGREEMENT,
        employee: { ...employeeInfo() },
      },
    ];

    setAgreementArr(newAgreementArr);
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
