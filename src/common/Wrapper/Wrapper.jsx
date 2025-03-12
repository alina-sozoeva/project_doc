import styles from "./Wrapper.module.scss";
import clsx from "clsx";

export const Wrapper = ({ children, className }) => {
  return <div className={clsx(styles.wrapper, className)}>{children}</div>;
};
