import { HomeOutlined } from "@ant-design/icons";
import styles from "./Wrapper.module.scss";
import clsx from "clsx";
import { Breadcrumb } from "antd";

export const Wrapper = ({ children, className, path, title, descrip, page = false }) => {
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
                  <span>{title}</span>
                </>
              ),
            },
          ]}
        />
      )}

      <div className={clsx(styles.wrapper, className)}>{children}</div>
    </div>
  );
};
