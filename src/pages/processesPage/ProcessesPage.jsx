import { Button, Flex, Form, Input, message, Steps } from "antd";
import { WarningModal, Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import styles from "./ProcessesPage.module.scss";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const ProcessesPage = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [openSteps, setOpenSteps] = useState(false);
  const [create, setCreate] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onConfirm = () => {
    form.resetFields();
    setOpenSteps(false);
    setOpenModal(false);
  };

  const onCreate = () => {
    setOpenSteps(true);
    setCreate(true);
  };

  const onCloseCreate = () => {
    setCreate(true);
    setOpenModal(true);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = (values) => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
      })

      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const onFinish = () => {
    toast.success("Вы успешно создали процесс");
    setCreate(false);
    form.resetFields();
    setOpenSteps(false);
    setCurrent(0);
  };

  const steps = [
    {
      title: "Инициатор",
      content: (
        <Form.Item
          name="fio_initiator"
          label="ФИО инициатора"
          rules={[
            {
              required: true,
              message: "Это обязательное поле для заполнения",
            },
          ]}
        >
          <Input placeholder="Введите ФИО инициатора" />
        </Form.Item>
      ),
    },
    {
      title: "Testov",
      //  (
      //   <Form.Item
      //     name="role1"
      //     rules={[
      //       {
      //         required: true,
      //         message: "Это обязательное поле для заполнения",
      //       },
      //     ]}
      //   >
      //     {current !== 1 ? (
      //       <p>Должность/отдел</p>
      //     ) : (
      //       <Input
      //         style={{ width: "250px" }}
      //         placeholder="Введите должность или отдел"
      //         onChange={(e) => onChange(e.target.value)}
      //       />
      //     )}
      //   </Form.Item>
      // ),
      content: (
        <>
          <Form.Item
            name="step2_fio"
            label="ФИО участника процесса"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input placeholder="Введите ФИО участника процесса" />
          </Form.Item>
          <Form.Item
            name="step2_time"
            label="Введите срок рассмотрения"
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
      ),
    },
    {
      title: "Testov2",
      // (
      //   <Form.Item
      //     name="role2"
      //     rules={[
      //       {
      //         required: true,
      //         message: "Это обязательное поле для заполнения",
      //       },
      //     ]}
      //   >
      //     {current !== 2 ? (
      //       <p>Должность/отдел</p>
      //     ) : (
      //       <Input
      //         style={{ width: "250px" }}
      //         placeholder="Введите должность или отдел"
      //       />
      //     )}
      //   </Form.Item>
      // ),
      content: (
        <>
          <Form.Item
            name="step3_fio"
            label="ФИО участника процесса"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input placeholder="Введите ФИО участника процесса" />
          </Form.Item>
          <Form.Item
            name="step3_time"
            label="Введите срок рассмотрения"
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
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Wrapper
      className={styles.content}
      path={pathname.PROCESSES}
      title={pages.PROCESSES}
      page={true}
    >
      <Flex gap={"large"} vertical justify="center" align="center">
        {!create ? (
          <Button type="primary" onClick={onCreate}>
            Создать процесс
          </Button>
        ) : (
          <Button type="primary" danger onClick={onCloseCreate}>
            Завершить процесс
          </Button>
        )}

        {openSteps && (
          <>
            <Steps current={current} items={items} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={onFinish}
            >
              <div className={styles.contentStyle}>
                {steps[current].content}
              </div>
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Назад
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => handleSubmit()}>
                  Вперед
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                  htmlType="submit"
                >
                  Создать
                </Button>
              )}
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
