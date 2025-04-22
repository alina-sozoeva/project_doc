import { useRef, useState } from "react";
import { Button, Divider, Flex, Form, Steps, Table } from "antd";
import { WarningModal, Wrapper } from "../../common";
import { pages, pathname, processesMap, status } from "../../enums";
import { toast } from "react-toastify";
import { AddProcessesModal, StepContent } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addToProcessesMembers, useGetProcessesQuery } from "../../store";
import { v4 as uuidv4 } from "uuid";
import styles from "./ProcessesPage.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { useProcessesColumns } from "./useProcessesColumns";
import { dataDocument } from "../../data";

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

export const ProcessesPage = () => {
  const processId = useRef(uuidv4());
  const [form] = Form.useForm();

  const defultSteps = [
    {
      title: "Должность/отдел",
      content: <StepContent form={form} />,
    },
    {
      title: "Должность/отдел",
      content: <StepContent form={form} />,
    },
  ];

  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [openSteps, setOpenSteps] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState(defultSteps);
  const [formData, setFormData] = useState({});
  const [modalType, setModalType] = useState(null);
  const [modalText, setModalText] = useState({});
  const [openProcessesModal, setOpenProcessesModal] = useState(false);
  const processes = useSelector((state) => state.processes.processes);
  const { data, isLoading } = useGetProcessesQuery();

  const handleOpenStep = () => {
    setOpenSteps(true);
  };

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
      .then((values) => {
        addMembers(values);

        setFormData((prev) => ({
          ...prev,
          [current]: values,
        }));

        form.resetFields();

        const next = current + 1;
        setCurrent(next);
        if (formData[next]) {
          form.setFieldsValue(formData[next]);
        }
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const onConfirm = () => {
    form.resetFields();
    setOpenModal(false);

    if (modalType === "cancel") {
      clear();
    }

    if (modalType === "removeStep") {
      removeStep();
    }

    setModalType(null);
  };

  const onFinish = (values) => {
    // dispatch(
    //   addToProcesses([
    //     {
    //       id: processId.current,
    //       title: processesMap[title],
    //       slug: title,
    //     },
    //   ])
    // );
    addMembers(values);
    // toast.success("Вы успешно создали процесс");
    clear();
  };

  const addStep = () => {
    setSteps((steps) => [
      ...steps,
      {
        title: "Должность/отдел ",
        content: <StepContent form={form} />,
      },
    ]);
  };

  const removeStep = () => {
    if (steps.length <= 2) {
      return;
    }
    setSteps(() => [...steps.slice(0, steps.length - 1)]);
    setOpenModal(false);
  };

  const prev = () => {
    const prevStep = current - 1;
    setCurrent(prevStep);

    if (formData[prevStep]) {
      form.setFieldsValue(formData[prevStep]);
    }
  };

  const { columns } = useProcessesColumns(handleOpenStep);

  return (
    <Wrapper
      className={styles.content}
      path={pathname.PROCESSES}
      title={pages.PROCESSES}
      page={true}
    >
      <Flex gap={"large"} vertical justify="center">
        <Flex justify="space-between" align="center">
          <Button type="primary" onClick={() => setOpenProcessesModal(true)}>
            <PlusOutlined /> Создать процесс
          </Button>
        </Flex>
        <Divider style={{ margin: "10px 0" }} />
        <>
          <Table
            loading={isLoading}
            dataSource={data ? data?.data : processes}
            columns={columns}
            pagination={false}
            className={styles.table}
            bordered
            scroll={{ y: 480 }}
            onRow={() => ({
              onClick: () => handleOpenStep(),
            })}
            rowClassName={() => styles.clickableRow}
          />
          <Divider style={{ margin: "10px 0" }} />
          {openSteps && (
            <>
              <Flex gap={"small"} justify="end">
                <Button type="primary" onClick={addStep}>
                  Добавить участника
                </Button>
                <Button
                  danger
                  onClick={() => {
                    setModalType("removeStep");
                    setOpenModal(true);
                    setModalText({
                      title: "удаление участника",
                      btn: "Удалить",
                      text: "удалить участника процесса",
                    });
                  }}
                >
                  Удалить участника
                </Button>
              </Flex>
              <Steps current={current} items={items} />
              <Form
                initialValues={{
                  time_limit: 1,
                }}
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
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
                    onClick={() => {
                      setModalType("cancel");
                      setOpenModal(true);
                      setModalText({
                        title: "действие",
                        btn: "Отменить",
                        text: "отменить изменения все данные будут удалены",
                      });
                    }}
                  >
                    Отменить изменения
                  </Button>
                </Flex>
              </Form>
            </>
          )}
        </>
      </Flex>
      <WarningModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onConfirm={onConfirm}
        modalText={modalText}
      />
      <AddProcessesModal
        open={openProcessesModal}
        onCancel={() => setOpenProcessesModal(false)}
        processId={processId}
      />
    </Wrapper>
  );
};
