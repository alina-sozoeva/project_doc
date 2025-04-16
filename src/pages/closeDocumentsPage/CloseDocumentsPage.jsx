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
import { employeeInfo } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addToDocuments, addToNotifications } from "../../store";
import { useState } from "react";
import { toast } from "react-toastify";

const { Title } = Typography;

export const CloseDocumentsPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [statusFolder, setStatusFolder] = useState(status.IN_PROCESS);
  const processesMembers = useSelector(
    (state) => state.processes.processesMembers
  );

  const processes = useSelector((state) => state.processes.processes);

  const filtedArr = processes.find((item) => item.slug === "/close-documents");

  const filteredProcessesMem = processesMembers.filter(
    (item) => item.process_id === filtedArr.id
  );

  const onFinish = (values) => {
    const newGuid = uuidv4();

    if (statusFolder === status.DRAFT) {
      toast.info("Ваш документ успешно добавлен в черновики");
    } else {
      toast.success("Ваш документ успешно отправлен на проверку");
    }

    const newFolderArr = {
      guid: newGuid,
      data: {
        user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
        user_name: employeeInfo().fio,
        doc_name: values.title,
        process_name: values.process_name,
        comments: values.comments,
        folder_name: status.IN_PROCESS,
        close_date: values.close_date,
        close_status: values.close_status,
        basis_document: values.basis_document,
        closing_documents: values.closing_documents?.fileList || [],
        cover_sheet: values.cover_sheet?.fileList || [],
        title: pages.CLOSE_DOCUMENTS,
      },
      status: statusFolder,
      process_id: filteredProcessesMem[0]?.process_id,
      employee: { ...employeeInfo() },
    };

    if (statusFolder !== status.DRAFT) {
      dispatch(
        addToNotifications([
          {
            id: uuidv4(),
            user_id: employeeInfo().id,
            doc_id: newGuid,
            status: false,
            comment: "",
            folder_status: statusFolder,
            member_id: filteredProcessesMem[0]?.employee_id,
            step: filteredProcessesMem[0]?.step_index,
            department_id: filteredProcessesMem[0]?.department_id,
            position_id: filteredProcessesMem[0]?.position_id,
            process_id: filteredProcessesMem[0]?.process_id,
          },
        ])
      );
    }

    dispatch(addToDocuments([newFolderArr]));
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
          <Button
            htmlType="submit"
            onClick={() => setStatusFolder(status.DRAFT)}
          >
            Сохранить в черновики
          </Button>
          <Button type="primary" htmlType="submit">
            Инициировать закрытие
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};
