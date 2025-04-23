import { Button, Flex, Form, Input, Modal, Select, Upload } from "antd";
import { departments, positions } from "../../constants";
import { useAddEmployeesMutation, useUploadFileMutation } from "../../store";
import { useState } from "react";

const { Dragger } = Upload;

export const EmployeeModal = ({ open, onCancel, headId }) => {
  const [form] = Form.useForm();
  const [addEmployee] = useAddEmployeesMutation();
  const [uploaded] = useUploadFileMutation();
  const [files, setFiles] = useState("");

  const handleFileUpload = async (uploadedFiles) => {
    const uploadedFileUrls = [];
    try {
      for (const file of uploadedFiles) {
        const formData = new FormData();
        formData.append("file", file.originFileObj);
        const uploadResponse = await uploaded(formData).unwrap();
        uploadedFileUrls.push(uploadResponse.filesInfo[0].name);
      }
      setFiles(uploadedFileUrls[0]);
    } catch (err) {
      console.error("Ошибка при загрузке файлов", err);
    }
  };

  const onFinish = async (values) => {
    const newEmployee = {
      fio: values.fio,
      email: values.email,
      position: values.position,
      department: values.department,
      head_id: headId,
      photo: "",
      phone_number: values.phone_number,
    };

    addEmployee(newEmployee);
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
              onChange={(info) => {
                const { fileList } = info;
                if (fileList.length) {
                  handleFileUpload(fileList);
                }
              }}
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
