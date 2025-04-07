import { Button, Flex, Input, Tooltip } from "antd";
import { MailOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./EmployeeCard.module.scss";
import { departmentMap, positionMap } from "../../enums";
// import foto from "../../assets/profile.jpg";

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
              defaultValue={item ? departmentMap[item.department] : ""}
              className={styles.imp_depart}
            />
          </Flex>
          <Input
            placeholder={"Должность"}
            defaultValue={item ? positionMap[item.position] : ""}
          />
        </Flex>
        <img src={item.photo} alt="" className={styles.img} />
      </Flex>
      <Flex>
        <Tooltip title={item.email}>
          <div
            className={styles.contact}
            style={{ borderRight: "1px solid #2c3443" }}
          >
            <MailOutlined /> Email
          </div>
        </Tooltip>
        <Tooltip title={item.phone_number}>
          <div className={styles.contact}>
            <PhoneOutlined /> Телефон
          </div>
        </Tooltip>
      </Flex>
      <Button className={styles.btn_add} onClick={onOpen}>
        <PlusOutlined />
      </Button>
    </Flex>
  );
};
