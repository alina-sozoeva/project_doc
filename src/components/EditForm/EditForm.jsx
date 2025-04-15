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
import { toast } from "react-toastify";

export const EditForm = ({ item }) => {
  const { id, status: stat } = useParams();
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const processesMembers = useSelector(
    (state) => state.processes.processesMembers
  );

  const processes = useSelector((state) => state.processes.processes);

  const filtedArr = processes.find((item) => item.slug === "/purchase-request");

  const filteredProcessesMem = processesMembers.filter(
    (item) => item.process_id === filtedArr.id
  );

  const [documents, setDocuments] = useState([]);

  //чекаем документ
  const newNotif = notifications.find((item) => item.doc_id === id);

  const approvedNotif = () => {
    dispatch(
      editNotifications({
        ...newNotif,
        member_id: filteredProcessesMem[1].employee_id,
        step: filteredProcessesMem[1].step_index,
        department_id: filteredProcessesMem[1]?.department_id,
        position_id: filteredProcessesMem[1]?.position_id,
        process_id: filteredProcessesMem[1]?.process_id,
        folder_status: status.IN_PROCESS,
      })
    );
    toast.success("Вы успешно согласовали документ");
  };

  const rejectedNotif = () => {
    dispatch(
      editNotifications({
        ...newNotif,
        member_id: filteredProcessesMem[0].employee_id,
        step: filteredProcessesMem[0].step_index,
        department_id: filteredProcessesMem[0]?.department_id,
        position_id: filteredProcessesMem[0]?.position_id,
        process_id: filteredProcessesMem[0]?.process_id,
        folder_status: status.REJECTED,
      })
    );
    toast.error("Отказано в рассмотрении документа");
  };

  const revisionNotif = () => {
    dispatch(
      editNotifications({
        ...newNotif,
        member_id: filteredProcessesMem[0].employee_id,
        step: filteredProcessesMem[0].step_index,
        department_id: filteredProcessesMem[0]?.department_id,
        position_id: filteredProcessesMem[0]?.position_id,
        process_id: filteredProcessesMem[0]?.process_id,
        folder_status: status.IN_PROCESS,
      })
    );
    toast.warning("Документ отправлен на доработку");
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocuments((prevDocs) => [...prevDocs, ...files]);
  };

  return (
    <Wrapper className={styles.content}>
      <Flex vertical justify="space-between" gap="middle">
        <Flex gap="small" justify="space-between" align="center">
          <Flex gap="small">
            {stat === status.IN_PROCESS && (
              <>
                <Button
                  statusFolder={status.DRAFT}
                  icon={<CheckOutlined />}
                  source="table"
                  onClick={approvedNotif}
                >
                  Согласовать
                </Button>
                <StatusButton
                  statusFolder={status.DRAFT}
                  icon={<CloseOutlined />}
                  source="table"
                  onClick={rejectedNotif}
                >
                  Отказать
                </StatusButton>
                <StatusButton
                  statusFolder={status.DRAFT}
                  icon={<SyncOutlined />}
                  source="table"
                  onClick={revisionNotif}
                >
                  Доработать
                </StatusButton>
              </>
            )}

            {[status.DRAFT, status.REVISION].includes(stat) && (
              <StatusButton
                statusFolder={status.DRAFT}
                icon={<CloudUploadOutlined />}
                source="table"
              >
                Сохранить
              </StatusButton>
            )}

            {stat === status.DRAFT && (
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
            )}
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
