import { Card, Flex, Typography } from "antd";
import styles from "./CustomCard.module.scss";
import { FileTextOutlined } from "@ant-design/icons";

export const CustomCard = ({
  title,
  count = null,
  backgroundColor,
  filter,
}) => {
  return (
    <Card style={{ backgroundColor: backgroundColor }} className={styles.card}>
      <Flex vertical="vertical" gap="small" align="center">
        <Typography.Title level={4}>
          {count !== null ? `${title}: ${count}` : title}
        </Typography.Title>
        <Flex gap="small">
          {count !== null ? (
            <>
              <Flex vertical="vertical" gap="small" align="center">
                <Card>{0}</Card>
                <Typography.Text>Новые</Typography.Text>
              </Flex>

              <Flex vertical="vertical" gap="small" align="center">
                <Card>{0}</Card>
                <Typography.Text>Просроченные</Typography.Text>
              </Flex>
            </>
          ) : (
            <Flex vertical="vertical" align="center" justify="space-between">
              {/* <FileTextOutlined /> */}
              <p>Нет данных</p>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};
