import { BellFilled, LogoutOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.nav} container`}>
        <img src="" alt="logo" className={styles.nax_logo} />
        <div className={styles.nav_list}>
          <button className={styles.nav_btn}>
            <p className={styles.empl}>Список сотрудников</p>
          </button>
          <button className={styles.nav_btn}>
            <BellFilled className={styles.mess} />
          </button>
          <img
            src="http://docs.icloud.kg/image/avatar/28.jpg"
            alt="user foto"
            className={styles.user_foto}
          />
          <p>Name</p>
          <button className={styles.nav_btn}>
            <LogoutOutlined className={styles.out} />
          </button>
        </div>
      </div>
    </header>
  );
};
