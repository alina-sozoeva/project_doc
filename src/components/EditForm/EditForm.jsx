import { Button, Flex, Input, Typography } from "antd";
import { StatusButton, Wrapper } from "../../common";
import { status } from "../../enums";
import {
  CheckOutlined,
  CloseOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  FileAddOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import styles from "./EditForm.module.scss";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { editNotifications } from "../../store";
import { getStepDataList, getStepEmployee } from "../../utils";
import { toast } from "react-toastify";

export const EditForm = ({ item }) => {
  const { id, status: stat } = useParams();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifArr);

  const [documents, setDocuments] = useState([]);

  const objFilter = documents?.find((item) => item.guid === id);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocuments((prevDocs) => [...prevDocs, ...files]);
  };

  const member = getStepDataList();

  const filteredMember = member?.find(
    (item) => item.title === "/purchase-request"
  );

  console.log(filteredMember);

  const lastElement =
    filteredMember?.members[filteredMember?.members.length - 1];
  console.log(lastElement);

  //чекаем документ
  const test = notifications.find((item) => item.doc_id === id);

  const updateNotif = () => {
    if (test.step === 1) {
      dispatch(
        editNotifications({
          ...test,
          member_id: getStepEmployee(filteredMember, 1),
          step: 2,
        })
      );
    }
    if (test.step === 2) {
      dispatch(
        editNotifications({
          ...test,
          member_id: getStepEmployee(filteredMember, 2),
          step: 3,
        })
      );
    }
    if (test.step === 3) {
      dispatch(
        editNotifications({
          ...test,
          member_id: getStepEmployee(filteredMember, 3),
          step: 4,
        })
      );
    }
    if (test.step === 4) {
      dispatch(
        editNotifications({
          ...test,
          member_id: getStepEmployee(filteredMember, 4),
          step: 5,
        })
      );
    }
    if (test.step === 5) {
      dispatch(
        editNotifications({
          ...test,
          member_id: getStepEmployee(filteredMember, 5),
          step: 6,
        })
      );
    }
    if (test.step === 6) {
      dispatch(
        editNotifications({
          ...test,
          member_id: getStepEmployee(filteredMember, 6),
          step: 7,
        })
      );
    }
    // dispatch(
    //   editNotifications({ ...test, member_id: secondMemberId, step: 2 })
    // );
    toast.success("Вы успешно согласовали документ");
  };

  // const updateNotif = () => {
  //   const nextStepMap = {
  //     1: 2,
  //     2: 3,
  //     3: 4,
  //     4: 5,
  //     5: 6,
  //     6: 7,
  //     7: 8,
  //   };

  //   const nextStep = nextStepMap[test.step];

  //   console.log(nextStep);

  //   if (nextStep) {
  //     dispatch(
  //       editNotifications({
  //         ...test,
  //         member_id: getStepEmployee(filteredMember, test.step),
  //         step: nextStep,
  //       })
  //     );
  //     toast.success("Вы успешно согласовали документ");
  //   }
  // };

  return (
    <Wrapper className={styles.content}>
      <Flex vertical justify="space-between" gap="middle">
        <Flex gap="small" justify="space-between" align="center">
          <Flex gap="small">
            {/* {stat === status.IN_PROCESS && ( */}
            <>
              <Button
                statusFolder={status.DRAFT}
                icon={<CheckOutlined />}
                source="table"
                onClick={updateNotif}
              >
                Согласовать
              </Button>
              {/* <StatusButton
                  statusFolder={status.DRAFT}
                  icon={<CloseOutlined />}
                  source="table"
                >
                  Отказать
                </StatusButton>
                <StatusButton
                  statusFolder={status.DRAFT}
                  icon={<SyncOutlined />}
                  source="table"
                >
                  Доработать
                </StatusButton> */}
            </>
            {/* )} */}

            {/* {[status.DRAFT, status.REVISION].includes(stat) && (
              <StatusButton
                statusFolder={status.DRAFT}
                icon={<CloudUploadOutlined />}
                source="table"
              >
                Сохранить
              </StatusButton>
            )} */}

            {/* {stat === status.DRAFT && (
              <StatusButton
                statusFolder={status.DRAFT}
                icon={<EnvironmentOutlined />}
                source="table"
              >
                Маршрут
              </StatusButton>
            )}
            {stat !== status.IN_PROCESS && (
              <StatusButton
                statusFolder={status.REJECTED}
                icon={<DeleteOutlined />}
                source="table"
              >
                Удалить
              </StatusButton>
            )} */}
          </Flex>
          <div>
            <div>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileUpload}
                className={styles.input}
              />
              <label htmlFor="file-upload" className={styles.customButton}>
                <FileAddOutlined /> Выбрать файл
              </label>
            </div>
          </div>
        </Flex>
        <Flex vertical justify="center" align="center" gap="middle">
          {/* <Typography.Title level={3}>Шапка документа</Typography.Title> */}
          <p>Партнер Нефть</p>
          <img style={{ width: "200px" }} src={logo} alt="logo" />
          <p>№ Рапорта</p>
          <Input value={id} type="number" style={{ width: "200px" }} />
        </Flex>
        <Flex gap="small">
          <Input.TextArea placeholder="Тема" />
        </Flex>
        <Flex>
          <Input.TextArea placeholder="Содержание" />
        </Flex>
        <Flex vertical align="center" justify="center" gap={"small"}>
          <Typography.Title level={4}>Файлы:</Typography.Title>
          {documents?.map((doc, index) => (
            <div key={index}>
              <div>
                <p>{doc.name}</p>
              </div>
            </div>
          ))}
        </Flex>
      </Flex>
    </Wrapper>
  );
};
