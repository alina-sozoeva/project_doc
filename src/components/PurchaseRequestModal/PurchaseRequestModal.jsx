import { Button, DatePicker, Flex, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import styles from "./PurchaseRequestModal.module.scss";
import { status } from "./../../enums/enums";

export const PurchaseRequestModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const [folderArr, setFolderArr] = useState([]);
  const [lastGuid, setLastGuid] = useState(0);

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
    console.log(values);

    const newFolderArr = [
      ...folderArr,
      {
        guid: lastGuid + 1,
        user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
        user_name: "Leon Kennady",
        title: values.name,
        description: values.comment,
        folder_name: status.DRAFT,
        count: 12,
        date: values.end_date,
        status: status.IN_PROCESS,
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

  return (
    <Modal
      width={500}
      centered
      open={open}
      onCancel={onClose}
      footer={false}
      title="Формирование заявок на закуп"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          paddingRight: "10px",
          marginTop: "20px",
        }}
      >
        <Flex vertical>
          <Form.Item
            label="Наименование запускаемого процесса"
            name="name"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input type="text" placeholder="Введите наименование " />
          </Form.Item>
          <Form.Item
            label="Основание заявки"
            name="application"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input type="text" placeholder="Введите основание заявки" />
          </Form.Item>
          <Form.Item
            label="Контрагент"
            name="counterparty"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input type="text" placeholder="Введите контрагент" />
          </Form.Item>
          <Form.Item
            label="Сумма заявки"
            name="application_amount"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input type="number" placeholder="Введите сумму заявки" />
          </Form.Item>
          <Form.Item
            label="Крайний срок проведения"
            name="end_date"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Введите крайний срок проведения"
            />
          </Form.Item>
          <Form.Item
            label="Бюджетная статья"
            name="budget"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Select
              placeholder="Выберите бюджетную статью"
              //   onChange={handleChange}
              options={[
                { value: "true", label: "Бюджет" },
                { value: "false", label: "Вне бюджета" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Комментарии" name="comment">
            <Input type="text" placeholder="Введите комментарий" />
          </Form.Item>
        </Flex>
        <Flex gap={"small"} justify="end">
          <Button type="default" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
