import { useRef, useState } from "react";
import { Button, Divider, Flex, Form, Steps, Table } from "antd";
import { WarningModal, Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import { AddProcessesModal, StepContent } from "../../components";
import { useSelector } from "react-redux";
import {
  useAddProcessesMembersMutation,
  useGetProcessesByIdQuery,
  useGetProcessesMembersQuery,
  useGetProcessesQuery,
} from "../../store";
import { v4 as uuidv4 } from "uuid";
import styles from "./ProcessesPage.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { useProcessesColumns } from "./useProcessesColumns";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

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

  const [current, setCurrent] = useState(0);
  const [openSteps, setOpenSteps] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState(defultSteps);
  const [formData, setFormData] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [modalText, setModalText] = useState({});
  const [openProcessesModal, setOpenProcessesModal] = useState(false);
  const { data, isLoading } = useGetProcessesQuery();
  const [selectedId, setSelectedId] = useState(null);
  const { data: dataById } = useGetProcessesByIdQuery(
    selectedId ? selectedId : skipToken
  );
  const { data: processesMembers } = useGetProcessesMembersQuery({});
  const [addMembers] = useAddProcessesMembersMutation();

  const blockedProcessIds = new Set(
    processesMembers?.data?.map((member) => member.process_id)
  );

  const clear = () => {
    setOpenSteps(false);
    setCurrent(0);
    setSteps(defultSteps);
    setTitle("");
  };

  const handleOpenStep = (id) => {
    clear();
    setFormData([]);
    setSelectedId(id);
    setOpenSteps(true);
    form.resetFields();
  };

  const items = steps?.map((item, index) => ({
    key: `step${index}`,
    title: item.title,
  }));

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData((prev) => [
          ...prev,
          {
            process_id: selectedId,
            step_index: current,
            department: values.department_id,
            position: values.position_id,
            time_limit: values.time_limit,
            employee_id: values.employee_id,
            status: "",
          },
        ]);

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
    addMembers([
      ...formData,
      {
        process_id: selectedId,
        step_index: current,
        department: values.department_id,
        position: values.position_id,
        time_limit: values.time_limit,
        employee_id: values.employee_id,
        status: "",
      },
    ]);
    toast.success("Вы успешно обновили процесс");
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
            dataSource={data?.data}
            columns={columns}
            pagination={false}
            className={styles.table}
            bordered
            scroll={{ y: 480 }}
            onRow={(record) => ({
              onClick: () => {
                if (!blockedProcessIds.has(record.guid)) {
                  handleOpenStep(record.guid);
                } else {
                  clear();
                  toast.warn(
                    "Процесс уже используется, редактирование недоступно"
                  );
                }
              },
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
