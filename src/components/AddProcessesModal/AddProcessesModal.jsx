import { Button, Flex, Form, Input, Modal, Select, Typography } from "antd";
import { useDispatch } from "react-redux";
import { addToProcesses, useAddProcessesMutation } from "../../store";
import { useState } from "react";

const processes = [
  {
    label: "Создание карточки контрагента",
    value: "contragent",
  },
  {
    label: "Согласование договора",
    value: "soglosovanie",
  },
  {
    label: "Формирование заявок на закуп",
    value: "zakup",
  },
  {
    label: "Формирование заявок на выплату",
    value: "vyplata",
  },
  {
    label: "Закрытие документов",
    value: "close-documents",
  },
];

export const AddProcessesModal = ({ open, onCancel, processId }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [addProcesses] = useAddProcessesMutation();

  const onFinish = (values) => {
    dispatch(
      addToProcesses([
        {
          id: processId.current,
          name: values.title,
          basic_processes: values.process_name,
        },
      ])
    );
    addProcesses({
      name: values.title,
      basic_processes: values.process_name,
    });
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
            name="name"
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
            name="basic_processes"
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
