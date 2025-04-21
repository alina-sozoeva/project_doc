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
  Row,
  Col,
  message,
} from "antd";
import styles from "./AddAgreementModal.module.scss";
import { MinusCircleFilled, MinusCircleOutlined } from "@ant-design/icons";

export const AddAgreementModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("1");
  };

  const blockExtensions = [
    ".exe",
    ".bat",
    ".cmd",
    ".sh",
    ".js",
    ".msi",
    ".vbs",
  ];
  const isSafeExtension = (file) => {
    const name = file.name.toLowerCase();
    return !blockExtensions.some((ext) => name.endsWith(ext));
  };

  const customBeforeUpload = (file) => {
    if (!isSafeExtension(file)) {
      message.error(`${file.name} — не верный формат.`);
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const props = {
    multiple: true,
    beforeUpload: customBeforeUpload,
    showUploadList: true,
  };

  const onClose = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal width={850} centered open={open} onCancel={onClose} footer={false}>
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
        <Typography.Title level={4}>
          Добавить документ на формирование выплату
        </Typography.Title>
        <Row gutter={24}>
          <Col span={12}>
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

            <Form.Item label="Комментарии" name="comments">
              <Input.TextArea rows={3} placeholder="Введите комментарии" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={12}>
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
                  <DatePicker
                    placeholder="Выберите дату"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Сумма договора"
                  name="contract_amount"
                  rules={[
                    {
                      required: true,
                      message: "Это обязательное поле для заполнения",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    type="number"
                    addonAfter="cом"
                    placeholder="Введите сумму"
                  />
                </Form.Item>
              </Col>
            </Row>

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

            <Form.Item
              label="Файл договора"
              name="contract_file"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле для заполнения",
                },
              ]}
              className={styles.uploadArea}
            >
              <Upload
                {...props}
                showUploadList={{
                  showRemoveIcon: true,
                  showPreviewIcon: false,
                }}
                itemRender={(originNode, file, fileList, actions) => {
                  return (
                    <span className={styles.customUploadItem}>
                      <span>{file.name}</span>
                      <p onClick={() => actions.remove?.()}>X</p>
                    </span>
                  );
                }}
                className={styles.uploadArea}
              >
                <Button>Загрузить файл</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Flex justify="start">
          <Button type="primary" htmlType="submit">
            Добавить в черновики
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
