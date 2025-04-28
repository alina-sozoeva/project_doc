import { Flex, Input } from "antd";
import { Wrapper } from "../../common";

import { useParams } from "react-router-dom";
import styles from "./EditForm.module.scss";
import logo from "../../assets/logo.png";

export const EditForm = ({ item }) => {
  const { id } = useParams();

  console.log(item);

  return (
    <Wrapper className={styles.content}>
      <Flex vertical justify="space-between" gap="middle">
        <Flex vertical justify="center" align="center" gap="middle">
          <p>Партнер Нефть</p>
          <img style={{ width: "200px" }} src={logo} alt="logo" />
          <p>№ Рапорта</p>
          <Input value={item?.guid} style={{ width: "330px" }} disabled />
        </Flex>

        <Flex gap="small">
          <Input.TextArea
            placeholder="Тема"
            disabled
            value={item?.company_name}
          />
        </Flex>
        <Flex>
          <Input.TextArea placeholder="Содержание" disabled />
        </Flex>
      </Flex>
    </Wrapper>
  );
};
