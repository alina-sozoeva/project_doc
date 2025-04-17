import { Button, Flex, Form, Input, Modal, Typography, Upload } from "antd";
import { status } from "../../enums";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addToDocuments } from "../../store";

export const AddProcessesModal = ({ open, onCancel }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    form.resetFields();
    onCancel();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal width={400} centered open={open} onCancel={onClose} footer={false}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Flex vertical gap={"small"} justify="center">
          <Typography.Title level={6}>Создать новый процесс</Typography.Title>
          <Form.Item
            label="Название процесса"
            name="title"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input placeholder="Название процесса" />
          </Form.Item>
          <Form.Item
            label="Описание документа"
            name="description"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input.TextArea placeholder="Описание папки" />
          </Form.Item>
          <Form.Item label="Выберите файл" name="file">
            <Upload beforeUpload={() => false} showUploadList={false}>
              <Button style={{ width: "350px" }} icon={<UploadOutlined />}>
                Загрузить файл
              </Button>
            </Upload>
          </Form.Item>
          {/* <Form.Item label="Название папки" name="folder_name">
            <Select placeholder="Статус документа" options={folderOptions} />
          </Form.Item> */}
          <Flex justify="end" gap={"small"}>
            <Button type="default" onClick={onClose}>
              Отмена
            </Button>
            <Button type="primary" htmlType="submit">
              Загрузить
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};
