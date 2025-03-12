import { Drawer, Button } from "antd";
import styles from './FloderDrawer.module.scss'

export const FloderDrawer = ({ openFloder, onOpenFloder }) => {
  return (
    <Drawer
      title={
        <div className={styles.drawer}>
          <h2>Мои документы</h2>
          <Button>Выбрать файлы</Button>
          <Button>Файл не выбран</Button>
          <Button type="primary" >
            Загрузить
          </Button>
        </div>
      }
      placement="left"
      open={openFloder}
      onClose={onOpenFloder}
      width="100vw"
    ></Drawer>
  );
};
