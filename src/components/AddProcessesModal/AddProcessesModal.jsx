import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  Upload,
} from "antd";
import { status } from "../../enums";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addToDocuments, addToProcesses } from "../../store";
import { useState } from "react";

const processes = [
  {
    label: "Создание карточки контрагента",
    value: "/create-counterparty",
  },
  {
    label: "Согласование договора",
    value: "/agreement",
  },
  {
    label: "Формирование заявок на закуп",
    value: "/purchase-request",
  },
  {
    label: "Формирование заявок на выплату",
    value: "/payment-request",
  },
  {
    label: "Закрытие документов",
    value: "/close-documents",
  },
];

export const AddProcessesModal = ({ open, onCancel, processId }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");

  const onFinish = (values) => {
    dispatch(
      addToProcesses([
        {
          id: processId.current,
          title: values.title,
          process_name: values.process_name,
        },
      ])
    );
    form.resetFields();
    onCancel();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };
  const handleChange = (value) => {
    setTitle(value);
  };

  return (
    <Modal width={400} centered open={open} onCancel={onClose} footer={false}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Flex vertical gap={"small"} justify="center">
          <Typography.Title level={4}>Добавить процесс</Typography.Title>
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
            label="Название основного процесса"
            name="process_name"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Select
              placeholder="Выберите название процесcа"
              options={processes}
              onChange={handleChange}
              value={title || undefined}
            />
          </Form.Item>
          <Flex justify="end">
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};
