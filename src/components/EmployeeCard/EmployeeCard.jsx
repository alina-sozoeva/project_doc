import { Button, Col, Flex, Input, Row, Tooltip } from "antd";
import { MailOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./EmployeeCard.module.scss";
import { departmentMap, positionMap } from "../../enums";
import foto from "../../assets/foto.jpg";

export const EmployeeCard = ({ onOpen, item }) => {
  return (
    <Flex vertical className={styles.content}>
      <Flex vertical align="center" justify="center">
        {item.department !== 0 && (
          <p className={styles.imp_depart}>{departmentMap[item.department]}</p>
        )}
        <p>
          <b>{positionMap[item.position] || item.position}</b>
        </p>
        <Flex gap={"small"} align="center">
          <img src={item.photo || foto} alt="" className={styles.img} />
          <Flex vertical align="start">
            <p>{item ? item.fio : foto}</p>
            <p>{item.email}</p>
          </Flex>
        </Flex>
      </Flex>
      <Button
        className={item.department === 0 ? styles.btn_add_ceo : styles.btn_add}
        onClick={onOpen}
      >
        <PlusOutlined />
      </Button>
    </Flex>
  );
};
