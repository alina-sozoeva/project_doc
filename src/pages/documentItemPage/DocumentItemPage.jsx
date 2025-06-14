import { Button, Flex, Input, Typography } from "antd";
import { StatusButton, Wrapper } from "../../common";
import { pages, pathname, status } from "../../enums";
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
import { useState } from "react";
import { useGetDocsByIdQuery } from "../../store";
import logo from "../../assets/logo.png";

import styles from "./DocumentItemPage.module.scss";

export const DocumentItemPage = ({ item }) => {
  const { id, status: stat } = useParams();

  const { data } = useGetDocsByIdQuery({ guid: id });

  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocuments((prevDocs) => [...prevDocs, ...files]);
  };

  return (
    <Wrapper
      path={`${pathname.DOCUMENTS}?process_name=all-docs-process`}
      title={pages.DOCUMENTS}
      page={true}
      className={styles.content}
      pathChildter={`/document/${id}`}
      descrip={pages.DOCUMENT}
    >
      <Flex vertical justify="space-between" gap="middle">
        <Flex gap="small" justify="space-between" align="center">
          <Flex gap="small">
            {stat === status.IN_PROCESS && (
              <>
                <Button
                  statusFolder={status.DRAFT}
                  icon={<CheckOutlined />}
                  source="table"
                  // onClick={updateNotif}
                >
                  Согласовать
                </Button>
                <StatusButton
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
