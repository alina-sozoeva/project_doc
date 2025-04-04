import { Form, Input } from "antd";

export const StepTitle = ({ current, count }) => {
  console.log(current);

  return (
    <Form.Item
      name={`role${count}`}
      rules={[
        {
          required: true,
          message: "Это обязательное поле для заполнения",
        },
      ]}
    >
      {current !== count ? (
        <p>Должность/отдел</p>
      ) : (
        <Input
          style={{ width: "250px" }}
          placeholder="Введите должность или отдел"
        />
      )}
    </Form.Item>
  );
};
