import { Button, Flex, Form, Input, Modal, Select, Typography } from "antd";
import styles from "./AddCunterpartyModal.module.scss";

export const AddCunterpartyModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("1");
  };

  return (
    <Modal
      title="Добавить контрагента"
      width={500}
      centered
      open={open}
      onCancel={onCancel}
      footer={false}
    >
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
        <Flex vertical>
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
            name="contact_person"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input type="text" placeholder="Введите ФИО контактного лица" />
          </Form.Item>
          <Form.Item
            label="Номер телефона"
            name="phone"
            rules={[{ required: true, message: "Введите номер телефона" }]}
          >
            <Input type="number" placeholder="Введите номер телефона" />
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
                { value: "jack", label: "ожидание" },
                { value: "lucy", label: "проверено" },
                { value: "Yiminghe", label: "отклонено" },
              ]}
            />
          </Form.Item>
        </Flex>
        <Flex gap={"small"} justify="end">
          <Button type="default" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
