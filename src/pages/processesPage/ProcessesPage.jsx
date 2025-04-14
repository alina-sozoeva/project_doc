import { useMemo, useRef, useState } from "react";
import { Button, Divider, Flex, Form, Select, Steps, Typography } from "antd";
import { WarningModal, Wrapper } from "../../common";
import { pages, pathname, processesMap } from "../../enums";
import { toast } from "react-toastify";
import { StepContent } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addToProcesses, addToProcessesMembers } from "../../store";
import { v4 as uuidv4 } from "uuid";
import styles from "./ProcessesPage.module.scss";

const processes = [
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

const defultSteps = [
  {
    title: "Должность/отдел",
    content: <StepContent />,
  },
  {
    title: "Должность/отдел",
    content: <StepContent />,
  },
];

export const ProcessesPage = () => {
  const processId = useRef(uuidv4());
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const processesArr = useSelector((state) => state.processes.processes);
  const [current, setCurrent] = useState(0);
  const [openSteps, setOpenSteps] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState(defultSteps);

  const handleChange = (value) => {
    setTitle(value);
  };

  const filteredprocesses = processes?.filter(
    (item) => !processesArr?.some((p) => p.slug === item.value)
  );

  const items = steps?.map((item, index) => ({
    key: `step${index}`,
    title: item.title,
  }));

  const addMembers = (values) => {
    dispatch(
      addToProcessesMembers([
        {
          process_id: processId.current,
          step_index: current,
          department_id: values.department_id,
          position_id: values.position_id,
          time_limit: values.time_limit,
          employee_id: values.employee_id,
          status: values.status,
        },
      ])
    );
  };

  const clear = () => {
    setOpenSteps(false);
    setCurrent(0);
    setSteps(defultSteps);
    setTitle("");
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        const values = form.getFieldsValue();
        addMembers(values);
        setCurrent(current + 1);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const onConfirm = () => {
    form.resetFields();
    setOpenModal(false);
    clear();
  };

  const onFinish = (values) => {
    dispatch(
      addToProcesses([
        {
          id: processId.current,
          title: processesMap[title],
          slug: title,
        },
      ])
    );
    addMembers(values);
    toast.success("Вы успешно создали процесс");
    clear();
  };

  const addStep = () => {
    const newIndex = steps.length;
    setSteps((steps) => [
      ...steps,
      {
        title: "Должность/отдел ",
        content: <StepContent count={newIndex} />,
      },
    ]);
  };

  const removeStep = () => {
    if (steps.length <= 2) {
      return;
    }
    setSteps(() => [...steps.slice(0, steps.length - 1)]);
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
            {filteredprocesses.length === 0 ? (
              <Typography.Text type="secondary">
                Все процессы созданы
              </Typography.Text>
            ) : (
              <Select
                style={{ width: "250px" }}
                placeholder="Выберите название процесcа"
                options={filteredprocesses}
                onChange={handleChange}
                value={title || undefined}
              />
            )}
          </Flex>

          {openSteps ? (
            <Flex gap={"small"}>
              <Button type="primary" onClick={addStep}>
                Добавить участника
              </Button>
              <Button danger onClick={removeStep}>
                Удалить участника
              </Button>
            </Flex>
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
              <div>{steps[current]?.content}</div>
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
                  Удалить процесс
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
