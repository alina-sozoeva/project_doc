import { Button, Flex, Form, Input, Modal, Typography } from "antd";
import styles from "./FolderModal.module.scss";

export const FolderModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("12");
  };

  return (
    <Modal width={400} centered open={open} onCancel={onCancel} footer={false}>
      <Form form={form} onFinish={onFinish}>
        <Flex vertical gap={"small"} justify="center">
          <Typography.Title level={3}>Мои документы</Typography.Title>
          <Input placeholder="Выбрать файл" />
          <Input placeholder="Файл не выбран" />
          <Flex justify="center">
            <Button type="primary">Загрузить</Button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};
