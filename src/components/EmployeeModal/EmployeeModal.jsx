import { Button, Flex, Form, Input, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import foto from "../../assets/foto.jpg";
import { departments, positions } from "../../constants";

const { Dragger } = Upload;

export const EmployeeModal = ({ open, onCancel, headId, add }) => {
  const [form] = Form.useForm();
  const [employeesArr, setEmployeesArr] = useState(() => {
    const savedEmployees = localStorage.getItem("employeesArr");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  console.log(headId);

  useEffect(() => {
    localStorage.setItem("employeesArr", JSON.stringify(employeesArr));
  }, [employeesArr]);

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onFinish = async (values) => {
    const photo = values.photo?.fileList?.[0]?.originFileObj;

    const base64 = photo ? await toBase64(photo) : foto;

    const newEmployee = {
      id: uuidv4(),
      fio: values.fio,
      email: values.email,
      position: values.position,
      department: values.department,
      headId,
      photo: base64,
      phone_number: values.phone_number,
    };

    setEmployeesArr((prevEmployees) => [...prevEmployees, newEmployee]);
    add(newEmployee);
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
            label="Номер телефона"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input placeholder="Введите номер телефона" />
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
            <Select
              showSearch
              placeholder="Выберите отдел"
              optionFilterProp="label"
              options={departments}
            />
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
            <Select
              showSearch
              placeholder="Выберите должность участника процесса"
              optionFilterProp="label"
              options={positions}
            />
          </Form.Item>
          <Form.Item
            initialValue={{}}
            name="photo"
            label="Фото сотрудника"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Dragger
              name="file"
              multiple={false}
              accept="image/*"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div className="flex justify-center items-center gap-[11px] h-[88px]">
                <p className="ant-upload-hint">
                  Перетащите файлы, чтобы прикрепить их или выберите
                </p>
              </div>
            </Dragger>
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
