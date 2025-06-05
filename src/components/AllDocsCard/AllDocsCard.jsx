import { StarOutlined } from "@ant-design/icons";
import { Checkbox, Col, Flex, Row } from "antd";

import styles from "./AllDocsCard.module.scss";
import dayjs from "dayjs";

export const AllDocsCard = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={styles.card_wrap}
      align="center"
      gap={"small"}
    >
      <Row gutter={24}>
        <Col
          span={1}
          style={{ textAlign: "left" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Flex gap={"middle"}>
            <Checkbox />
            <StarOutlined />
          </Flex>
        </Col>
        <Col span={4} style={{ textAlign: "left" }}>
          <span>{item?.employee?.fio}</span>
        </Col>
        <Col span={15} style={{ textAlign: "left" }}>
          <span>{item?.comments}</span>
        </Col>
        <Col span={4} style={{ textAlign: "right" }}>
          <span>{dayjs(item?.created_at).format("DD.MM.YYYY HH:mm")}</span>
        </Col>
      </Row>
    </div>
  );
};
