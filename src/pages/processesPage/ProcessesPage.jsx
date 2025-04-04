import {
  Alert,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Steps,
  Typography,
} from "antd";
import { WarningModal, Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import styles from "./ProcessesPage.module.scss";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { StepContent } from "./components";

export const ProcessesPage = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [openSteps, setOpenSteps] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const stepsArr = [];
  for (let i = 0; i < 4; i++) {
    stepsArr.push({
      title: "Должность/отдел",
      content: <StepContent count={i} />,
    });
  }

  const items = stepsArr.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
      })

      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const onConfirm = () => {
    form.resetFields();
    setOpenSteps(false);
    setOpenModal(false);
    setCurrent(0);
    setTitle("");
  };

  const onFinish = () => {
    toast.success("Вы успешно создали процесс");
    form.resetFields();
    setOpenSteps(false);
    setCurrent(0);
    setTitle("");
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Wrapper
      className={styles.content}
      path={pathname.PROCESSES}
      title={pages.PROCESSES}
      page={true}
    >
      <Flex gap={"large"} vertical justify="center">
        <Flex justify="space-between" align="center">
          <Flex gap={"small"} align="center">
            <Typography.Text>Название процесса:</Typography.Text>
            <Input
              value={title}
              style={{ width: "250px" }}
              placeholder="Введите название процесcа"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Flex>

          {openSteps ? (
            <Button type="primary">Добавить участника</Button>
          ) : (
            <Button
              type="primary"
              onClick={() => setOpenSteps(true)}
              disabled={!title}
            >
              Создать процесс
            </Button>
          )}
        </Flex>
        {openSteps && (
          <>
            <Divider style={{ margin: "10px 0" }} />
            <Steps current={current} items={items} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={onFinish}
            >
              <div className={styles.contentStyle}>
                {stepsArr[current].content}
              </div>
              <Flex justify="space-between">
                <Flex gap={"small"}>
                  {current > 0 && <Button onClick={() => prev()}>Назад</Button>}
                  {current < stepsArr.length - 1 && (
                    <Button type="primary" onClick={() => handleSubmit()}>
                      Вперед
                    </Button>
                  )}
                  {current === stepsArr.length - 1 && (
                    <Button
                      type="primary"
                      onClick={() => message.success("Processing complete!")}
                      htmlType="submit"
                    >
                      Создать
                    </Button>
                  )}
                </Flex>
                <Button
                  type="primary"
                  danger
                  onClick={() => setOpenModal(true)}
                >
                  Удалить
                </Button>
              </Flex>
            </Form>
          </>
        )}
      </Flex>
      <WarningModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onConfirm={onConfirm}
      />
    </Wrapper>
  );
};
