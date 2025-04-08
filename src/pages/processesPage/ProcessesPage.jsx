import { useState } from "react";
import { Button, Divider, Flex, Form, Select, Steps, Typography } from "antd";
import { WarningModal, Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import { toast } from "react-toastify";
import { StepContent } from "./components";
import styles from "./ProcessesPage.module.scss";
import { folderArr, stepDataList } from "../../utils";

const processesArr = [
  {
    label: "Создание карточки контрагента",
    value: "/create-counterparty",
  },
  {
    label: "Согласование договора",
    value: "/agreement",
  },
  {
    label: "Формирование заявок на закуп",
    value: "/purchase-request",
  },
  {
    label: "Формирование заявок на выплату",
    value: "/payment-request",
  },
  {
    label: "Закрытие документов",
    value: "/close-documents",
  },
];

export const ProcessesPage = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [openSteps, setOpenSteps] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [stepData, setStepData] = useState([]);
  const [steps, setSteps] = useState([
    {
      title: "Должность/отдел",
      content: <StepContent count={0} form={form} />,
    },
    {
      title: "Должность/отдел",
      content: <StepContent count={1} form={form} />,
    },
  ]);

  const usedTitles = stepDataList?.map((item) => item.title);

  const filteredProcessesArr = processesArr?.filter(
    (item) => !usedTitles?.includes(item.value)
  );

  console.log(filteredProcessesArr);

  const items = steps?.map((item, index) => ({
    key: `step${index}`,
    title: item.title,
  }));

  const handleStepChange = (stepIndex, values) => {
    setStepData((prev) => {
      const newData = [...prev];
      newData[stepIndex] = {
        ...values,
        documents: [],
      };
      return newData;
    });
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        const values = form.getFieldsValue();
        handleStepChange(current, values);
        setCurrent(current + 1);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const addStep = () => {
    const newIndex = steps.length;
    setSteps((prevSteps) => [
      ...prevSteps,
      {
        title: "Должность/отдел ",
        content: <StepContent count={newIndex} form={form} />,
      },
    ]);
  };

  const onConfirm = () => {
    form.resetFields();
    setOpenSteps(false);
    setOpenModal(false);
    setCurrent(0);
    setSteps([
      {
        title: "Должность/отдел 1",
        content: <StepContent count={0} form={form} />,
      },
      {
        title: "Должность/отдел 1",
        content: <StepContent count={1} form={form} />,
      },
    ]);
    setTitle("");
  };

  const onFinish = (values) => {
    handleStepChange(current, values);
    toast.success("Вы успешно создали процесс");

    const newProcess = {
      title,
      members: stepData,
    };

    const existing = JSON.parse(localStorage.getItem("stepDataList")) || [];
    const updatedList = [...existing, newProcess];

    localStorage.setItem("stepDataList", JSON.stringify(updatedList));

    form.resetFields();
    setOpenSteps(false);
    setCurrent(0);
    setStepData([]);
    setSteps([
      {
        title: "Должность/отдел",
        content: <StepContent count={0} form={form} />,
      },
      {
        title: "Должность/отдел",
        content: <StepContent count={1} form={form} />,
      },
    ]);
    setTitle("");
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleChange = (value) => {
    setTitle(value);
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
            {filteredProcessesArr.length === 0 ? (
              <Typography.Text type="secondary">
                Все процессы созданы
              </Typography.Text>
            ) : (
              <Select
                style={{ width: "250px" }}
                placeholder="Выберите название процесcа"
                options={filteredProcessesArr}
                onChange={handleChange}
                value={title}
              />
            )}
          </Flex>

          {openSteps ? (
            <Button type="primary" onClick={addStep}>
              Добавить участника
            </Button>
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
        <Divider style={{ margin: "10px 0" }} />

        {openSteps && (
          <>
            <Steps current={current} items={items} />
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <div>{steps[current].content}</div>
              <Flex justify="space-between">
                <Flex gap={"small"}>
                  {current > 0 && <Button onClick={prev}>Назад</Button>}
                  {current < steps.length - 1 && (
                    <Button type="primary" onClick={handleSubmit}>
                      Вперед
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button type="primary" htmlType="submit">
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
