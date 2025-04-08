import { Button, DatePicker, Flex, Form, Input, Modal, Row, Col, Select } from "antd";
import { useEffect, useState } from "react";
import styles from "./PurchaseRequestModal.module.scss";
import { status } from "./../../enums/enums";

export const PurchaseRequestModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();

  const [folderArr, setFolderArr] = useState([]);
  const [lastGuid, setLastGuid] = useState(0);

  useEffect(() => {
    const savedFolderArr = JSON.parse(localStorage.getItem("folderArr")) || [];
    const savedLastGuid = Math.max(...savedFolderArr?.map((item) => item.guid), 0);
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
        name: values.name,
        title: values.title,
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
      width={800}
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
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Название документа"
              name="title"
              rules={[{ required: true, message: "Это обязательное поле для заполнения" }]}
            >
              <Input placeholder="Введите название документа " />
            </Form.Item>

            <Form.Item
              label="Основание заявки"
              name="application"
              rules={[{ required: true, message: "Это обязательное поле для заполнения" }]}
            >
              <Input placeholder="Введите основание заявки" />
            </Form.Item>

            <Form.Item
              label="Сумма заявки"
              name="application_amount"
              rules={[{ required: true, message: "Это обязательное поле для заполнения" }]}
            >
              <Input type="number" placeholder="Введите сумму заявки" />
            </Form.Item>

            <Form.Item
              label="Бюджетная статья"
              name="budget"
              rules={[{ required: true, message: "Это обязательное поле для заполнения" }]}
            >
              <Select
                placeholder="Выберите бюджетную статью"
                options={[
                  { value: "true", label: "Бюджет" },
                  { value: "false", label: "Вне бюджета" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Наименование запускаемого процесса"
              name="name"
              rules={[{ required: true, message: "Это обязательное поле для заполнения" }]}
            >
              <Input placeholder="Введите наименование " />
            </Form.Item>

            <Form.Item
              label="Контрагент"
              name="counterparty"
              rules={[{ required: true, message: "Это обязательное поле для заполнения" }]}
            >
              <Input placeholder="Введите контрагент" />
            </Form.Item>

            <Form.Item
              label="Крайний срок проведения"
              name="end_date"
              rules={[{ required: true, message: "Это обязательное поле для заполнения" }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Введите крайний срок проведения" />
            </Form.Item>

            <Form.Item label="Комментарии" name="comment">
              <Input placeholder="Введите комментарий" />
            </Form.Item>
          </Col>
        </Row>

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
