import {
  CloudUploadOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  MailOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import {
  FilterButton,
  FolderButton,
  StatusButton,
  Wrapper,
} from "../../common";
import styles from "./Filter.module.scss";
import { status } from "../../enums";
import { Button, Flex } from "antd";
import { useState } from "react";

export const Filter = () => {
  const [openFloder, setOpenFloder] = useState(false);

  return (
    <Wrapper>
      <div className={styles.filter}>
        <FilterButton
          icon={<CloudUploadOutlined />}
          onClick={() => setOpenFloder(true)}
        >
          Документы
        </FilterButton>
        <FilterButton icon={<FolderOpenOutlined />}>Все</FilterButton>
        <FilterButton icon={<MailOutlined />}>Входящие</FilterButton>
        <FilterButton icon={<VerticalAlignTopOutlined />}>
          Исходящие
        </FilterButton>
      </div>
      <div className={styles.status}>
        <StatusButton
          icon={true}
          typeIcon={"plus"}
          statusFolder={status.APPROVED}
        >
          Согласованные
        </StatusButton>
        <StatusButton
          icon={true}
          typeIcon={"close"}
          statusFolder={status.REJECTED}
        >
          Отказанные
        </StatusButton>
      </div>
      <div className={styles.floder}>
        <FolderButton>Папка</FolderButton>
        <FolderButton>Папка</FolderButton> <FolderButton>Папка</FolderButton>{" "}
        <FolderButton>Папка</FolderButton>
      </div>
      <div className={styles.new_folder}>
        <Flex gap="small" wrap>
          <Button color="default" variant="filled" className={styles.btn}>
            <FolderAddOutlined />
            <p>Добавить папку</p>
          </Button>
        </Flex>
      </div>
    </Wrapper>
  );
};
