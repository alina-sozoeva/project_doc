import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Select,
  Typography,
} from "antd";
import { status } from "./../../enums/enums";
import { useAddDocsZakupMutation } from "../../store";

export const PurchaseRequestModal = ({ open, onCancel, processId, user }) => {
  const [form] = Form.useForm();
  const [addDocs] = useAddDocsZakupMutation();

  const onFinish = (values) => {
    // const newFolderArr = [
    //   ...folderArr,
    //   {
    //     guid: lastGuid + 1,
    //     user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    //     user_name: "Leon Kennady",
    //     name: values.name,
    //     title: values.title,
    //     description: values.comment,
    //     folder_name: status.DRAFT,
    //     count: 12,
    //     date: values.end_date,
    //     status: status.IN_PROCESS,
    //   },
    // ];

    // setFolderArr(newFolderArr);
    // setLastGuid(lastGuid + 1);
    // localStorage.setItem("folderArr", JSON.stringify(newFolderArr));
    const newDoc = {
      name: values.name,
      application: values.application,
      sum: values.sum,
      budget: values.budget,
      contragent: values.contragent,
      end_date: values.end_date,
      comments: values.comments,
      doc_id: 1,
      status: status.DRAFT,
      process_id: processId,
      employee_id: user.guid,
    };

    addDocs(newDoc);
    form.resetFields();
    onCancel();
  };

  const onClose = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal width={900} centered open={open} onCancel={onCancel} footer={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        style={{
          maxHeight: "700px",
          paddingRight: "10px",
          marginTop: "20px",
        }}
      >
        <Flex vertical gap={"small"}>
          <Typography.Title level={4}>
            Добавить заявку на закуп
          </Typography.Title>
          <Row gutter={24}>
            <Col span={12}>
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
                <Input placeholder="Введите наименование " />
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
                <Input placeholder="Введите основание заявки" />
              </Form.Item>

              <Form.Item label="Комментарии" name="comments">
                <Input.TextArea placeholder="Введите комментарий" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Контрагент"
                name="contragent"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
              >
                <Input placeholder="Введите контрагент" />
              </Form.Item>

              <Row gutter={24}>
                <Col span={12}>
                  {" "}
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
                      options={[
                        { value: 1, label: "Бюджет" },
                        { value: 0, label: "Вне бюджета" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
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
                </Col>
              </Row>
              <Form.Item
                label="Сумма заявки"
                name="sum"
                rules={[
                  {
                    required: true,
                    message: "Это обязательное поле для заполнения",
                  },
                ]}
              >
                <Input
                  style={{ width: "200px" }}
                  type="number"
                  placeholder="Введите сумму заявки"
                />
              </Form.Item>
            </Col>
          </Row>

          <Flex justify="end">
            <Button type="primary" htmlType="submit">
              Добавить в черновики
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};
