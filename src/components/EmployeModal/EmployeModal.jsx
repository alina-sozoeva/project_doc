import { Button, Flex, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

export const EmployeModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [employeeArr, setEmployeeArr] = useState([]);
  const [lastGuid, setLastGuid] = useState(0);

  useEffect(() => {
    const savedFolderArr = JSON.parse(localStorage.getItem("folderArr")) || [];
    const savedLastGuid = Math.max(
      ...savedFolderArr.map((item) => item.guid),
      0
    );
    setEmployeeArr(savedFolderArr);
    setLastGuid(savedLastGuid);
  }, []);

  const onFinish = (values) => {
    const newEmployee = [
      ...employeeArr,
      {
        id: lastGuid + 1,
        fio: values.fio,
        email: values.email,
        position: values.position,
        department: values.department,
      },
    ];
    setEmployeeArr(newEmployee);
    setLastGuid(lastGuid + 1);
    localStorage.setItem("employeeArr", JSON.stringify(newEmployee));
    form.resetFields();
    onCancel();
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
      title="Добавить нового сотрудника"
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Flex vertical gap={"small"}>
          <Form.Item
            label="ФИО сотрудника"
            name="fio"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input placeholder="Введите ФИО сотрудника" />
          </Form.Item>
          <Form.Item
            label="Email сотрудника"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message:
                  "Адрес электронной почты недействителен. Убедитесь, что он указан в таком формате: example@email.com.",
              },
            ]}
          >
            <Input placeholder="Введите email сотрудника" />
          </Form.Item>
          <Form.Item
            label="Должность сотрудника"
            name="position"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input placeholder="Введите должность сотрудника" />
          </Form.Item>
          <Form.Item
            label="Отдел"
            name="department"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input placeholder="Введите отдел" />
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
