import { Button, Flex, Form, Input, Modal, Typography, Upload } from "antd";
import { useState, useEffect } from "react";
import { status } from "../../enums";
import { UploadOutlined } from "@ant-design/icons";

export const FolderModal = ({ open, onCancel }) => {
  const [folderArr, setFolderArr] = useState([]);
  const [lastGuid, setLastGuid] = useState(0);
  const [form] = Form.useForm();
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const savedFolderArr = JSON.parse(localStorage.getItem("folderArr")) || [];
    const savedLastGuid = Math.max(
      ...savedFolderArr.map((item) => item.guid),
      0
    );
    setFolderArr(savedFolderArr);
    setLastGuid(savedLastGuid);
  }, []);

  const onFinish = (values) => {
    const newFolderArr = [
      ...folderArr,
      {
        guid: lastGuid + 1,
        user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
        user_name: "Leon Kennady",
        title: values.title,
        description: values.description,
        folder_name: values.folder_name ? values.folder_name : status.DRAFT,
        count: 12,
        date: currentDate,
        status: values.folder_name ? values.folder_name : status.DRAFT,
      },
    ];

    setFolderArr(newFolderArr);
    setLastGuid(lastGuid + 1);
    localStorage.setItem("folderArr", JSON.stringify(newFolderArr));
    form.resetFields();
    onCancel();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  const folderOptions = [
    { value: status.APPROVED, label: "Одобренные" },
    { value: status.REJECTED, label: "Отклоненные" },
    { value: status.IN_PROCESS, label: "В процессе" },
    { value: status.DRAFT, label: "Черновики" },
    { value: status.REVISION, label: "На доработке" },
  ];

  return (
    <Modal width={400} centered open={open} onCancel={onClose} footer={false}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Flex vertical gap={"small"} justify="center">
          <Typography.Title level={3}>Создать новый документ</Typography.Title>
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
            <Input placeholder="Название папки" />
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
