import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  Upload,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./CloseDocumentsTable.module.scss";

export const CloseDocumentsModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("Процесс закрытия документов запущен");
  };

  return (
    <Modal width={600} centered open={open} onCancel={onCancel} footer={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          paddingRight: "10px",
          marginTop: "20px",
        }}
      >
        <Flex vertical gap="small">
          <Typography.Title level={4}>
            Добавить документ на закрытие
          </Typography.Title>
          <Form.Item
            label="Наименование процесса"
            name="name"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input placeholder="Введите название процесса закрытия" />
          </Form.Item>

          <Form.Item
            label="Основание (договор/документ)"
            name="basis_document"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Select
              placeholder="Выберите документ-основание"
              options={[
                { value: "contract1", label: "Договор №123 от 01.01.2023" },
                { value: "contract2", label: "Договор №456 от 15.03.2023" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Дата закрытия"
            name="close_date"
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
            label="Закрывающие документы"
            name="closing_documents"
            rules={[
              {
                required: true,
                message: "Необходимо загрузить хотя бы один документ",
              },
            ]}
          >
            <Upload multiple>
              <Button icon={<UploadOutlined />}>Загрузить документы</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Сопроводительный лист"
            name="cover_sheet"
            rules={[
              {
                required: true,
                message: "Необходимо загрузить сопроводительный лист",
              },
            ]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>
                Загрузить сопроводительный лист
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Статус закрытия"
            name="close_status"
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
                { value: "closed", label: "Закрыт" },
                { value: "requires_correction", label: "Требует исправления" },
                { value: "in_progress", label: "В процессе" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Комментарии" name="comments">
            <Input.TextArea
              rows={4}
              placeholder="Введите дополнительную информацию"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Инициировать закрытие
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
