import { Form, Input } from "antd";

export const StepContent = ({ count }) => {
  return (
    <>
      <Form.Item
        name={`step${count}_department`}
        label="Название отдела"
        rules={[
          {
            required: true,
            message: "Это обязательное поле для заполнения",
          },
        ]}
      >
        <Input placeholder="Введите название отдела" />
      </Form.Item>
      <Form.Item
        name={`step${count}_position`}
        label="Должность участника процесса"
        rules={[
          {
            required: true,
            message: "Это обязательное поле для заполнения",
          },
        ]}
      >
        <Input placeholder="Введите должность участника процесса" />
      </Form.Item>
      <Form.Item
        name={`step${count}_time`}
        label="Cрок рассмотрения документа (дней)"
        rules={[
          {
            required: true,
            message: "Это обязательное поле для заполнения",
          },
        ]}
      >
        <Input type="number" placeholder="Введите количество дней" />
      </Form.Item>
    </>
  );
};
