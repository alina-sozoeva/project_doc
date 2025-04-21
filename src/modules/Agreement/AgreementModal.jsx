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
import { DocUploaded } from "../../common";
import styles from "./AgreementTable.module.scss";

export const AgreementModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("1");
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
            Добавить документ на формирование выплату
          </Typography.Title>

          <Row gutter={24}>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Номер договора"
                name="contract_number"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
              >
                <Input type="number" placeholder="Введите номер договора" />
              </Form.Item>
              <Form.Item
                label="Дата создания"
                name="creation_date"
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
              <Form.Item
                label="Контрагент"
                name="contragent"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
              >
                <Select
                  placeholder="Выберите контрагента"
                  options={[
                    { value: "company1", label: "ООО Ромашка" },
                    { value: "company2", label: "АО Василек" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Тип договора"
                name="contract_type"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
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
              <Form.Item label="Комментарии" name="comments">
                <Input.TextArea rows={3} placeholder="Введите комментарии" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Срок действия"
                name="validity_period"
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
                label="Сумма договора"
                name="sum"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
              >
                <Input
                  type="number"
                  addonAfter="cом"
                  placeholder="Введите сумму"
                />
              </Form.Item>
              <Form.Item
                label="Статус согласования"
                name="approval_status"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
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
              <Form.Item
                label="Файл договора"
                name="contract_file"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
              >
                <DocUploaded />
              </Form.Item>
            </Col>
          </Row>
        </Flex>
        <Flex justify="start">
          <Button type="primary" htmlType="submit">
            Отправить на согласование
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
