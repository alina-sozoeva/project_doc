import { Button, Col, Flex, Input, Row, Tooltip } from "antd";
import { MailOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./EmployeeCard.module.scss";
import { departmentMap, positionMap } from "../../enums";
// import foto from "../../assets/profile.jpg";

export const EmployeeCard = ({ onOpen, item }) => {
  return (
    <Flex vertical className={styles.content}>
      <Flex vertical align="center" justify="center">
        {item.department !== "CEO" && (
          <p className={styles.imp_depart}>{departmentMap[item.department]}</p>
        )}
        <p>
          <b>{positionMap[item.position] || item.position}</b>
        </p>

        {/* <Input
            placeholder={"Отдел"}
            defaultValue={departmentMap[item.department] || item.department}
            className={styles.imp_depart}
          />
          <Input placeholder={"ФИО"} defaultValue={item ? item.fio : ""} />

          <Input
            placeholder={"Должность"}
            defaultValue={positionMap[item.position] || item.position}
          /> */}

        <Flex gap={"small"} align="center">
          <img src={item.photo} alt="" className={styles.img} />
          <Flex vertical align="start">
            <p>{item ? item.fio : ""}</p>
            <p>{item.email}</p>
          </Flex>
        </Flex>
      </Flex>
      {/* <Row>
        <Col
          span={12}
          className={styles.contact}
          style={{ borderRight: "1px solid #2c3443" }}
        >
          {item.email}
        </Col>
        <Col span={12} className={styles.contact}>
          <PhoneOutlined /> {item.phone_number}
        </Col>
      </Row> */}
      <Button
        className={
          item.department === "CEO" ? styles.btn_add_ceo : styles.btn_add
        }
        onClick={onOpen}
      >
        <PlusOutlined />
      </Button>
    </Flex>
  );
};
