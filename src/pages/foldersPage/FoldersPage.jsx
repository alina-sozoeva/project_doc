import { Button, Flex, Input } from "antd";
import { FolderButton, FolderModal, Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import styles from "./FoldersPage.module.scss";
import { FolderAddOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

export const FoldersPage = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <Wrapper
      className={styles.content}
      path={pathname.FOLDERS}
      title={pages.FOLDERS}
      page={true}
    >
      <Flex justify="space-between">
        <Input
          placeholder="Поиск"
          prefix={<SearchOutlined />}
          style={{
            width: "20%",
          }}
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          <FolderAddOutlined />
          Добавить папку
        </Button>
      </Flex>

      <Flex vertical gap={"small"}>
        <FolderButton>Папка</FolderButton>
        <FolderButton>Папка</FolderButton>
        <FolderButton>Папка</FolderButton>
        <FolderButton>Папка</FolderButton>
        <FolderButton>Папка</FolderButton>
      </Flex>
      <FolderModal open={open} onCancel={onClose} />
    </Wrapper>
  );
};
