import { Button, Flex, Form, Input, Modal } from "antd";
import { useState } from "react";

export const DepartmetModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [departmetArr, setDepartmetArr] = useState([]);
  const [lastGuid, setLastGuid] = useState(0);

  const onFinish = (values) => {
    const newDepartmet = [
      ...departmetArr,
      { id: lastGuid + 1, departmet: values.department },
    ];
    setDepartmetArr(newDepartmet);
    setLastGuid(lastGuid + 1);

    localStorage.setItem("departmetArr", JSON.stringify(newDepartmet));
    form.resetFields();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      width={420}
      centered
      open={open}
      onCancel={onClose}
      footer={false}
      title="Добавить новsq отдел"
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Flex vertical gap={"small"}>
          <Form.Item
            label="Название отдела"
            name="department"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input
              defaultValue={"Отдел"}
              placeholder="Введите навзание отдела"
            />
          </Form.Item>
          <Flex justify="space-between" gap={"small"}>
            <Button style={{ width: "100%" }} onClick={onClose}>
              Закрыть
            </Button>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Добавить
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};
