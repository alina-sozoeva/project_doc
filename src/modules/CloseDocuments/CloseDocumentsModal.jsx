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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./CloseDocumentsTable.module.scss";
import { DocUploaded } from "../../common";
import { useAddDocsCloseMutation } from "../../store";
import { useState } from "react";
import { status } from "../../enums";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const CloseDocumentsModal = ({ open, onCancel, processId, user }) => {
  const [form] = Form.useForm();
  const [addDocs] = useAddDocsCloseMutation();

  const [filesClosing, setFilesClosing] = useState([]);
  const [filesCover, setFilesCover] = useState([]);

  const handleFileUploadClosing = async (uploadedFiles) => {
    console.log(uploadedFiles);

    const uploadedFileUrls = [];
    try {
      for (const file of uploadedFiles) {
        const formData = new FormData();
        formData.append("closing_documents", file.originFileObj);
        // const uploadResponse = await uploaded(formData).unwrap();
        // uploadedFileUrls.push(uploadResponse.filesInfo[0].name);
      }
      setFilesClosing(uploadedFileUrls);
    } catch (err) {
      console.error("Ошибка при загрузке файлов", err);
    }
  };

  const handleFileUploadCover = async (uploadedFiles) => {
    console.log(uploadedFiles);

    const uploadedFileUrls = [];
    try {
      for (const file of uploadedFiles) {
        const formData = new FormData();
        formData.append("cover_sheet", file.originFileObj);
        // const uploadResponse = await uploaded(formData).unwrap();
        // uploadedFileUrls.push(uploadResponse.filesInfo[0].name);
      }
      setFilesCover(uploadedFileUrls);
    } catch (err) {
      console.error("Ошибка при загрузке файлов", err);
    }
  };

  const onFinish = (values) => {
    const newDoc = {
      name: values.name,
      basis_document: values.basis_document,
      close_date: values.close_date,
      close_status: values.close_status,
      closing_documents: "test",
      comments: values.comments,
      cover_sheet: "test",
      doc_id: "",
      status: status.DRAFT,
      process_id: processId,
      employee_id: user.guid,
      member_id: "",
    };

    addDocs(newDoc);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal width={900} centered open={open} onCancel={onCancel} footer={false}>
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
        <Flex vertical gap="small">
          <Typography.Title level={4}>
            Добавить документ на закрытие
          </Typography.Title>
          <Row gutter={24}>
            <Col span={12}>
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

              <Form.Item label="Комментарии" name="comments">
                <Input.TextArea
                  rows={4}
                  placeholder="Введите дополнительную информацию"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row gutter={24}>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
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
                        {
                          value: "requires_correction",
                          label: "Требует исправления",
                        },
                        { value: "in_progress", label: "В процессе" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
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
                    <DocUploaded onChange={handleFileUploadClosing} />
                  </Form.Item>
                </Col>
                <Col span={12}>
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
                    <DocUploaded onChange={handleFileUploadCover} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Flex justify="end">
            <Button type="primary" htmlType="submit">
              Добавить в черновики
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};
