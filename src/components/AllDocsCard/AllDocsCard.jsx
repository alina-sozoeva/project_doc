import { StarOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

import styles from "./AllDocsCard.module.scss";

export const AllDocsCard = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={styles.card_wrap}
      align="center"
      gap={"small"}
    >
      <Row gutter={24}>
        <Col>
          <StarOutlined />
        </Col>
        <Col span={4} style={{ textAlign: "left" }}>
          <span>{item?.employee?.fio}</span>
        </Col>
        <Col span={16} style={{ textAlign: "left" }}>
          <span>{item?.comments}</span>
        </Col>
        <Col span={4} style={{ textAlign: "rigth" }}>
          <span>{item?.created_at}</span>
        </Col>
      </Row>
    </div>
  );
};
