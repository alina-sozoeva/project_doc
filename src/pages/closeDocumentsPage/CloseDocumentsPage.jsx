import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Upload,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Wrapper } from "../../common";
import { pages, pathname, status } from "../../enums";
import styles from "./CloseDocumentsPage.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { employeeInfo, getFolderArr } from "../../utils";

const { Title } = Typography;

export const CloseDocumentsPage = () => {
  const [form] = Form.useForm();
  const [folderArr, setFolderArr] = useState([]);

  useEffect(() => {
    const savedFolderArr = getFolderArr() || [];
    setFolderArr(savedFolderArr);
  }, []);

  const onFinish = (values) => {
    const newFolderArr = [
      ...folderArr,
      {
        guid: uuidv4(),
        user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
        user_name: employeeInfo().fio,
        doc_name: values.title,
        title: pages.CLOSE_DOCUMENTS,
        process: pathname.CLOSE_DOCUMENTS,
        process_name: values.process_name,
        comments: values.comments,
        folder_name: status.IN_PROCESS,
        count: 12,
        close_date: values.close_date,
        close_status: values.close_status,
        process: pathname.CLOSE_DOCUMENTS,
        status: status.IN_PROCESS,
        employee: { ...employeeInfo() },
        basis_document: values.basis_document,
        closing_documents: values.closing_documents?.fileList || [],
        cover_sheet: values.cover_sheet?.fileList || [],
      },
    ];

    setFolderArr(newFolderArr);
    localStorage.setItem("folderArr", JSON.stringify(newFolderArr));
    form.resetFields();
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
                  {
                    value: "requires_correction",
                    label: "Требует исправления",
                  },
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
            <Flex justify="space-between">
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
            </Flex>
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
