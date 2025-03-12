import { Flex } from "antd";
import { CustomCard, Wrapper } from "../../common";
import { pathname } from "../../enums";
import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <Wrapper path={pathname.HOME} page={true} className={styles.home}>
      <Flex align="center" justify="space-between" gap="middle" wrap>
        <CustomCard
          title={"Задачи"}
          count={0}
          backgroundColor={"rgb(230, 244, 255)"}
        />
        <CustomCard
          title={"Почта"}
          backgroundColor={"rgba(155, 5, 255, 0.06)"}
        />
        <CustomCard
          title={"Календарь"}
          backgroundColor={"rgba(5, 255, 215, 0.1)"}
        />
        <CustomCard
          title={"Форум"}
          count={3}
          backgroundColor={"rgba(142, 255, 30, 0.08)"}
        />
        <CustomCard
          title={"Задачи от меня"}
          count={8}
          backgroundColor={"rgba(255, 5, 105, 0.06)"}
        />
        <CustomCard
          title={"Контроль"}
          backgroundColor={"rgba(255, 5, 105, 0.06)"}
        />
        <CustomCard
          title={"Отсутствия"}
          backgroundColor={"rgba(255, 22, 5, 0.06)"}
        />
        <CustomCard
          title={"Я редактирую"}
          backgroundColor={"rgba(255, 175, 5, 0.1)"}
        />
        <CustomCard
          title={"Мои документы"}
          count={26}
          backgroundColor={"rgba(245, 255, 5, 0.1)"}
        />
      </Flex>
    </Wrapper>
  );
};
