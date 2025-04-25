import styles from "./RouteButton.module.scss";
import { Button, Flex, Tooltip } from "antd";
import { status } from "../../enums";
import foto from "../../assets/foto.jpg";
import { useGetEmployeesQuery } from "../../store";

export const RouteButton = ({ children, statusFolder, onClick, item }) => {
  const color = (() => {
    switch (statusFolder) {
      case status.APPROVED:
        return "green";
      case status.REJECTED:
        return "danger";
      case status.IN_PROCESS:
        return "blue";
      case status.DRAFT:
        return "default";
      case status.REVISION:
        return "yellow";
      default:
        return "";
    }
  })();

  const { data } = useGetEmployeesQuery();

  const filtered = data?.data?.find((i) => i?.guid === item?.employee_id);

  return (
    <Tooltip
      title={
        <Flex vertical>
          {item ? (
            <>
              <p>{filtered?.fio}</p>
              <p>{filtered?.email}</p>
            </>
          ) : (
            "Нет данных"
          )}
        </Flex>
      }
    >
      <div className={styles.content}>
        <Button
          className={styles.btn}
          color={color}
          variant="filled"
          onClick={onClick}
        >
          <img src={foto} alt="" />
          {children}
        </Button>
      </div>
    </Tooltip>
  );
};
