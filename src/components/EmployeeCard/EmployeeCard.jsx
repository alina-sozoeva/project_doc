import { Button, Flex, Input } from "antd";
import { MailOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./EmployeeCard.module.scss";
import foto from "../../assets/28.jpg";

export const EmployeeCard = ({ onOpen, item }) => {
  return (
    <Flex vertical className={styles.content}>
      <Flex className={styles.info} align="center" gap={"large"}>
        <Flex vertical align="center">
          <Flex gap={"small"} justify="center">
            <Input
              style={{ width: "120px" }}
              placeholder={"ФИО"}
              defaultValue={item ? item.fio : ""}
            />
            <Input
              style={{ width: "120px" }}
              placeholder={"Отдел"}
              defaultValue={item ? item.department : ""}
              className={styles.imp_depart}
            />
          </Flex>
          <Input
            placeholder={"Должность"}
            defaultValue={item ? item.position : ""}
          />
        </Flex>
        <img src={foto} alt="" className={styles.img} />
      </Flex>
      <Flex>
        <div
          className={styles.contact}
          style={{ borderRight: "1px solid #2c3443" }}
        >
          <MailOutlined /> Email
        </div>
        <div className={styles.contact}>
          <PhoneOutlined /> Телефон
        </div>
      </Flex>
      <Button className={styles.btn_add} onClick={onOpen}>
        <PlusOutlined />
      </Button>
    </Flex>
  );
};
