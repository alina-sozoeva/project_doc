import { Button, Col, DatePicker, Flex, Form, Input, Row, Select, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import styles from "./CloseDocumentsPage.module.scss";

const { Title } = Typography;

export const CloseDocumentsPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Процесс закрытия документов:', values);
    // Здесь можно добавить логику для обработки отправки данных, например, в API
  };

  return (
    <Wrapper
      className={styles.content}
      path={pathname.CLOSE_DOCUMENTS}
      title={pages.CLOSE_DOCUMENTS}
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
              label="Наименование процесса"
              name="process_name"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input placeholder="Введите название процесса закрытия" />
            </Form.Item>

            <Form.Item
              label="Основание (договор/документ)"
              name="basis_document"
              rules={[{ required: true, message: "Это обязательное поле" }]}
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
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Закрывающие документы"
              name="closing_documents"
              rules={[{ required: true, message: "Необходимо загрузить хотя бы один документ" }]}
            >
              <Upload multiple>
                <Button icon={<UploadOutlined />}>Загрузить документы</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Сопроводительный лист"
              name="cover_sheet"
              rules={[{ required: true, message: "Необходимо загрузить сопроводительный лист" }]}
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Загрузить сопроводительный лист</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Статус закрытия"
              name="close_status"
              rules={[{ required: true, message: "Это обязательное поле" }]}
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
              <Input.TextArea rows={4} placeholder="Введите дополнительную информацию" />
            </Form.Item>
          </Col>
        </Row>

        <Flex gap="small" justify="end" style={{ marginTop: "20px" }}>
          <Button type="default" onClick={() => form.resetFields()}>
            Отмена
          </Button>
          <Button type="primary" htmlType="submit">
            Инициировать закрытие
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};
