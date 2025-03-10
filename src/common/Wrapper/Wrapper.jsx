import styles from "./Wrapper.module.scss";
export const Wrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
