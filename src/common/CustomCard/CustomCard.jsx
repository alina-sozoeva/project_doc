import { Flex, Typography } from "antd";
import styles from "./CustomCard.module.scss";

export const CustomCard = ({
  title,
  count = null,
  backgroundColor,
  icon,
  onClick,
  path,
}) => {
  return (
    <a href={path}>
      <Flex
        style={{ backgroundColor: backgroundColor }}
        vertical
        align="center"
        className={styles.card}
        onClick={onClick}
      >
        <Typography.Title level={5}>
          {count !== null ? `${title}: ${count}` : title}
        </Typography.Title>
        {count !== null ? (
          <Flex>
            <Flex
              vertical
              gap="small"
              align="center"
              className={styles.card_count}
            >
              <div>{count}</div>
              <Typography.Text>Новые</Typography.Text>
            </Flex>

            <Flex
              vertical
              gap="small"
              align="center"
              className={styles.card_count}
            >
              <div>{0}</div>
              <Typography.Text>Просроченные</Typography.Text>
            </Flex>
          </Flex>
        ) : (
          <Flex vertical align="center" className={styles.noData}>
            {icon}
            <p>Нет данных</p>
          </Flex>
        )}
      </Flex>
    </a>
  );
};
