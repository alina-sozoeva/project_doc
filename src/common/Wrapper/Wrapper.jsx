import { HomeOutlined } from "@ant-design/icons";
import styles from "./Wrapper.module.scss";
import clsx from "clsx";
import { Breadcrumb } from "antd";
import { processesMap } from "../../enums";

export const Wrapper = ({
  children,
  className,
  path,
  pathChildter,
  title,
  descrip = null,
  page = false,
}) => {
  return (
    <div className={styles.content}>
      {page && (
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: path,
              title: (
                <>
                  <span>{processesMap[title] || title}</span>
                </>
              ),
            },
            descrip !== null && {
              href: pathChildter,
              title: <span>{descrip}</span>,
            },
          ].filter(Boolean)}
        />
      )}

      <div className={clsx(styles.wrapper, className)}>{children}</div>
    </div>
  );
};
