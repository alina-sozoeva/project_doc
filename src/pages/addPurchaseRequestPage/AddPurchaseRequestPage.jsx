import { Button, Col, DatePicker, Flex, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../common";
import { status, pages, pathname } from "../../enums";
import { employeeInfo, getStepDataList, getStepEmployee } from "../../utils";
import styles from "./AddPurchaseRequestPage.module.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToDocuments, addToNotifications } from "../../store";

export const AddPurchaseRequestPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [statusFolder, setStatusFolder] = useState(status.IN_PROCESS);

  const member = getStepDataList();

  const filteredMember = member?.filter(
    (item) => item.title === "/purchase-request"
  );

  const firtsMemberId = filteredMember?.length
    ? getStepEmployee(filteredMember, 0)
    : null;

  const onFinish = (values) => {
    const newGuid = uuidv4();

    const newFolderArr = {
      guid: newGuid,
      user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
      user_name: employeeInfo().fio,
      doc_name: values.title,
      name: values.name,
      title: pages.CREATE_PURCHASE_REQUEST,
      process: pathname.CREATE_PURCHASE_REQUEST,
      description: values.comment,
      folder_name: status.IN_PROCESS,
      count: 12,
      date: values.end_date,
      status: statusFolder,
      employee: { ...employeeInfo() },
    };

    dispatch(
      addToNotifications([
        {
          id: uuidv4(),
          user_id: employeeInfo().id,
          doc_id: newGuid,
          process: pathname.CREATE_PURCHASE_REQUEST,
          status: false,
          comment: "",
          folder_status: statusFolder,
          member_id: firtsMemberId,
          step: 1,
        },
      ])
    );

    dispatch(addToDocuments([newFolderArr]));
    if (statusFolder === status.DRAFT) {
      toast.info("Ваш документ успешно добавлен в черновики");
    } else {
      toast.success("Ваш документ успешно отправлен на проверку");
    }
    form.resetFields();
  };

  return (
    <Wrapper
      className={styles.content}
      path={pathname.CREATE_PURCHASE_REQUEST}
      title={pages.CREATE_PURCHASE_REQUEST}
      page={true}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Название документа"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Это обязательное поле",
                },
              ]}
            >
              <Input type="text" placeholder="Введите название документа " />
            </Form.Item>
            <Form.Item
              label="Наименование запускаемого процесса"
              name="name"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input placeholder="Введите наименование" />
            </Form.Item>

            <Form.Item
              label="Основание заявки"
              name="application"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input placeholder="Введите основание заявки" />
            </Form.Item>

            <Form.Item
              label="Контрагент"
              name="counterparty"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input placeholder="Введите контрагента" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Сумма заявки"
              name="application_amount"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Input type="number" placeholder="Введите сумму" />
            </Form.Item>
            <Form.Item
              label="Крайний срок проведения"
              name="end_date"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Выберите дату"
              />
            </Form.Item>

            <Form.Item
              label="Бюджетная статья"
              name="budget"
              rules={[{ required: true, message: "Это обязательное поле" }]}
            >
              <Select
                placeholder="Выберите бюджетную статью"
                options={[
                  { value: "true", label: "Бюджет" },
                  { value: "false", label: "Вне бюджета" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Комментарии" name="comment">
              <Input placeholder="Введите комментарий" />
            </Form.Item>
          </Col>
        </Row>

        <Flex gap="small" justify="end">
          <Button
            htmlType="submit"
            onClick={() => setStatusFolder(status.DRAFT)}
          >
            Добавить в черновики
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setStatusFolder(status.IN_PROCESS)}
          >
            Отравить на проверку
          </Button>
        </Flex>
      </Form>
    </Wrapper>
  );
};
