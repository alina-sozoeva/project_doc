import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  Typography,
} from "antd";
import styles from "./PaymentRequestTable.module.scss";

export const PaymentRequestTable = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("Заявка на выплату отправлена");
  };

  return (
    <Modal width={600} centered open={open} onCancel={onCancel} footer={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          paddingRight: "10px",
          marginTop: "20px",
        }}
      >
        <Flex vertical gap={"small"}>
          <Typography.Title level={4}>
            Создание заявки на выплату
          </Typography.Title>
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

          <Form.Item label="Контрагент" name="counterparty">
            <Select
              placeholder="Выберите контрагента"
              options={[
                // Здесь должны быть реальные данные из CRM
                { value: "company1", label: "ООО Ромашка" },
                { value: "company2", label: "АО Василек" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Сумма заявки"
            name="amount"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input type="number" placeholder="Введите сумму" />
          </Form.Item>

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
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Статья бюджета"
            name="budget_item"
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

          <Form.Item label="Комментарии" name="comments">
            <Input.TextArea placeholder="Введите дополнительную информацию" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Отправить на согласование
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
