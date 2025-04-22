import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  Typography,
  Row,
  Col,
} from "antd";
import styles from "./PaymentRequestTable.module.scss";
import { useAddDocsVyplataMutation } from "../../store";

export const PaymentRequestModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [addDocs] = useAddDocsVyplataMutation();

  const onFinish = (values) => {
    const newDoc = {
      request_name: values.request_name,
      request_basis: values.request_basis,
      contragent: values.contragent,
      sum: values.sum,
      payment_date: values.payment_date,
      budget: values.budget,
      comments: values.comments,
      doc_id: 1,
    };

    addDocs(newDoc);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal width={850} centered open={open} onCancel={onCancel} footer={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={{
          maxHeight: "700px",
          paddingRight: "10px",
          marginTop: "20px",
        }}
      >
        <Flex vertical gap={"small"}>
          <Typography.Title level={4}>
            Создание заявки на выплату
          </Typography.Title>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Наименование заявки"
                name="request_name"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
              >
                <Input placeholder="Введите название заявки" />
              </Form.Item>
              <Form.Item label="Основание заявки" name="request_basis">
                <Select
                  placeholder="Выберите договор"
                  options={[
                    // Здесь должны быть реальные данные из CRM
                    { value: "contract1", label: "Договор №123 от 01.01.2023" },
                    { value: "contract2", label: "Договор №456 от 15.03.2023" },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Комментарии" name="comments">
                <Input.TextArea placeholder="Введите дополнительную информацию" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Статья бюджета"
                name="budget"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
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
              <Form.Item label="Контрагент" name="contragent">
                <Select
                  placeholder="Выберите контрагента"
                  options={[
                    // Здесь должны быть реальные данные из CRM
                    { value: "company1", label: "ООО Ромашка" },
                    { value: "company2", label: "АО Василек" },
                  ]}
                />
              </Form.Item>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Срок оплаты"
                    name="payment_date"
                    rules={[
                      {
                        required: true,
                        message: "Это обязательное поле для заполнения",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Выберите дату"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Сумма заявки"
                    name="sum"
                    rules={[
                      {
                        required: true,
                        message: "Это обязательное поле для заполнения",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="Введите сумму" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            Добавить в черновики
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
