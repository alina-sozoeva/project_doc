import { Button, Flex, Input, Typography } from "antd";
import { StatusButton, Wrapper } from "../../common";
import { pathname, status } from "../../enums";
import {
  CheckOutlined,
  CloseOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  FileAddOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditForm.module.scss";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  editDocuments,
  editNotifications,
  removeFromNotifications,
} from "../../store";
import { toast } from "react-toastify";

const handleApproved = (
  newNotif,
  filteredDocumentsArr,
  filteredProcessesMem,
  dispatch,
  id,
  navigate
) => {
  if (!newNotif) {
    toast.error("Уведомление не найдено");
    return;
  }

  const currentStepIndex = newNotif.step;
  const currentIndex = filteredProcessesMem.findIndex(
    (item) => item.step_index === currentStepIndex
  );

  const next = filteredProcessesMem[currentIndex + 1];

  if (!next) {
    dispatch(removeFromNotifications(id));
    dispatch(
      editDocuments({
        ...filteredDocumentsArr,
        status: status.APPROVED,
      })
    );
    toast.success("Документ успешно утверждён");
    navigate(pathname.DOCUMENTS);
  } else {
    dispatch(
      editNotifications({
        ...newNotif,
        member_id: next.employee_id,
        step: next.step_index,
        department_id: next.department_id,
        position_id: next.position_id,
        process_id: next.process_id,
        folder_status: status.IN_PROCESS,
      })
    );
    toast.success("Вы успешно согласовали документ");
    navigate(pathname.DOCUMENTS);
  }
};

const handleRejected = (filteredDocumentsArr, dispatch, id, navigate) => {
  dispatch(removeFromNotifications(id));
  dispatch(
    editDocuments({
      ...filteredDocumentsArr,
      status: status.REJECTED,
    })
  );
  toast.error("Отказано в рассмотрении документа");
  navigate(pathname.DOCUMENTS);
};

const handleRevision = (filteredDocumentsArr, dispatch, id, navigate) => {
  dispatch(removeFromNotifications(id));
  dispatch(
    editDocuments({
      ...filteredDocumentsArr,
      status: status.REVISION,
    })
  );
  toast.warning("Документ отправлен на доработку");
  navigate(pathname.DOCUMENTS);
};

export const EditForm = ({ item }) => {
  const { id, status: stat } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const processesMembers = useSelector(
    (state) => state.processes.processesMembers
  );
  const documentsArr = useSelector((state) => state.documents.documents);
  const processes = useSelector((state) => state.processes.processes);

  const filtedArr = processes?.find(
    (item) => item.slug === "/purchase-request"
  );
  const filteredProcessesMem = processesMembers?.filter(
    (item) => item?.process_id === filtedArr?.id
  );

  const newNotif = notifications?.find((item) => item.doc_id === id);
  const filteredDocumentsArr = documentsArr.find((item) => item.guid === id);

  console.log(filteredDocumentsArr);

  const [documents, setDocuments] = useState([]);

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
                  onClick={() =>
                    handleApproved(
                      newNotif,
                      filteredDocumentsArr,
                      filteredProcessesMem,
                      dispatch,
                      id,
                      navigate
                    )
                  }
                >
                  Согласовать
                </Button>
                <Button
                  statusFolder={status.DRAFT}
                  icon={<CloseOutlined />}
                  source="table"
                  onClick={() =>
                    handleRejected(filteredDocumentsArr, dispatch, id, navigate)
                  }
                >
                  Отказать
                </Button>
                <Button
                  statusFolder={status.DRAFT}
                  icon={<SyncOutlined />}
                  source="table"
                  onClick={() =>
                    handleRevision(filteredDocumentsArr, dispatch, id, navigate)
                  }
                >
                  Доработать
                </Button>
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
        </Flex>

        <Flex vertical justify="center" align="center" gap="middle">
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
              <p>{doc.name}</p>
            </div>
          ))}
        </Flex>
      </Flex>
    </Wrapper>
  );
};
