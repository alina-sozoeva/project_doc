import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useAddDocsContragentMutation } from "../../store";
import { status } from "../../enums";
import styles from "./CounterpartyTable.module.scss";

export const CunterpartyModal = ({ open, onCancel, processId, user }) => {
  const [form] = Form.useForm();
  const [addDocs] = useAddDocsContragentMutation();

  const onFinish = (values) => {
    const newDoc = {
      nameid_contragent: "",
      company_name: values.company_name,
      inn: values.inn,
      legal_address: values.legal_address,
      actual_address: values.actual_address,
      fio: values.fio,
      phone: values.phone,
      email: values.email,
      bank_details: values.bank_details,
      verification_status: values.verification_status,
      doc_id: 1,
      status: status.DRAFT,
      process_id: processId,
      employee_id: user.guid,
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
            Создать карточку контрагента
          </Typography.Title>
          <Row gutter={24}>
            <Col span={12}>
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
                <Input
                  type="text"
                  placeholder="Введите юридическое наименование компании"
                />
              </Form.Item>
              <Form.Item label="ИНН" name="inn">
                <Input type="number" placeholder="Введите ИНН" />
              </Form.Item>
              <Form.Item label="Юридический адрес" name="legal_address">
                <Input type="text" placeholder="Введите юридический адрес" />
              </Form.Item>
              <Form.Item label="Фактический адрес" name="actual_address">
                <Input type="text" placeholder="Введите фактический адрес" />
              </Form.Item>
              <Form.Item
                label="Контактное лицо"
                name="fio"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
              >
                <Input type="text" placeholder="Введите ФИО контактного лица" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Номер телефона"
                name="phone"
                rules={[{ required: true, message: "Введите номер телефона" }]}
              >
                <Input type="phone" placeholder="Введите номер телефона" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
              >
                <Input type="email" placeholder="Введите email" />
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
                <Input type="text" placeholder="Введите банковские реквизиты" />
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
                  placeholder="Введите cтатус проверки"
                  //   onChange={handleChange}
                  options={[
                    { value: "pending", label: "ожидание" },
                    { value: "approved", label: "проверено" },
                    { value: "rejected", label: "отклонено" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Flex>
        <Button type="primary" htmlType="submit">
          Добавить в черновики
        </Button>
      </Form>
    </Modal>
  );
};
