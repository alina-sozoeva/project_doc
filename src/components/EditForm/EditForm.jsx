import { Flex, Input } from "antd";
import { StatusButton, Wrapper } from "../../common";
import { status } from "../../enums";
import {
  CheckOutlined,
  CloseOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  FileAddOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import styles from "./EditForm.module.scss";

export const EditForm = () => {
  const { id, status: stat } = useParams();

  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis nihil explicabo optio ipsa, beatae exercitationem eaque minima mollitia, vero iure quod maiores blanditiis quibusdam saepe deleniti. Nulla molestiae, ad laudantium magni sit vero et aperiam consequuntur";
  return (
    <Wrapper className={styles.content}>
      <Flex vertical justify="space-between" gap="middle">
        <Flex gap="small" justify="space-between" align="center">
          <Flex gap="small">
            {stat === status.IN_PROCESS && (
              <>
                <StatusButton
                  statusFolder={status.DRAFT}
                  icon={<CheckOutlined />}
                  source="table"
                >
                  Согласовать
                </StatusButton>
                <StatusButton
                  statusFolder={status.DRAFT}
                  icon={<CloseOutlined />}
                  source="table"
                >
                  Отказать
                </StatusButton>
                <StatusButton
                  statusFolder={status.DRAFT}
                  icon={<SyncOutlined />}
                  source="table"
                >
                  Доработать
                </StatusButton>
              </>
            )}

            {[status.DRAFT, status.REVISION].includes(stat) && (
              <StatusButton
                statusFolder={status.DRAFT}
                icon={<CloudUploadOutlined />}
                source="table"
              >
                Сохранить
              </StatusButton>
            )}

            {stat === status.DRAFT && (
              <StatusButton
                statusFolder={status.DRAFT}
                icon={<EnvironmentOutlined />}
                source="table"
              >
                Маршрут
              </StatusButton>
            )}
            {stat !== status.IN_PROCESS && (
              <StatusButton
                statusFolder={status.REJECTED}
                icon={<DeleteOutlined />}
                source="table"
              >
                Удалить
              </StatusButton>
            )}
          </Flex>
          <div>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABA5JREFUaEPtWltywjAQC/c/NB0ydbpR9Fibj7ZA/0gT29qHpA3ctm27b42/+/3nttvtttXP9fH0v8e9j2cf9+EfrunWwj0bEPZbHrve1eH3G74PVg+ZwDMw9UAK8AgGA+OCVM+ogI97DsAq4moxd30EpGaoru+qYxyYZZuBwUQkHB/AqvSwjGsmsOzZvS5jriI61cLaTuFYyjCWp/rs+h4PND5jSTLAWNofwBCRGvgllu6UPcsYIyuVUfc8ytU0S3c0TLEhu676buW6ksVUxlKeZoxHd/MVYEPz8dnunp2k7XtY1wGrsNJR5cVMRC3TTlDqGh0d74CmgJVTSoyJAUHjkeTK9bMzMSkYp2dZhl8a8OjhTompDDmWnGFQbAOn70q3lb4f94/hgZWFynQ6GOulZFaQtNjnmXWVM6ROq2ZbEYGzmjMHQ2JKk5hyWWMdRaynDCtGdQLPsp/GvkQuFYxaH0vZTUsscdRpJdJSUXaVgcHocAbuw9Zn7o2d73iWvQB4acBDlp4FOcOaSm9TySti7WR+PLsbD8egA0iHTBiQTiAdH6g2SXMyylMLsAKJZObIptOrysF1KmFWIm2GXxIwm5ZST8z42qqLqkeVdiqZQyliQ4nyDxdZQjCJ9h3RuP5Vgaic0T0LWwvPffQwylJ3E8bKahOmp78OOFkyZQKG51VujRGac0fOyqb26LTaxUu7/lCHUWWIwejo7KxHx4AmufoA7jKjIoqOiUkTUqc9FDMrNyanpSQd6LzSBqxE1SChhpIRAMYztW1coE4sjRFXdhLtmtosBe3XATutVRlM5sRFXpW9aieWOaXxSKBYHYe1nPW8Tj6UFLG+S1LiZmyn71iNl+HhbQAzp5Wyp6YlvO5c2ywBsbUdgSoMl2mJlUktRewnBR6fUetiL84aj45fP7UYvgB4ecBpeGBSlOQoZckRFSM8x9JpmsOzXr5bUiXmHJSakmb1tiuPrgqZEpyC2CUtN+GojKrqwCwyoEhqjiiZUVJ70BcAjOHeBnDqETfyrTAwy6ySmNTbbMBpfz/s+hEXVkFiB2AyV68x2em801K6/b6AnYAjtbsMpOy68nQk51qHrSlJDl/TOolJ7mkEYuVwyLRpGuoEjg0eO0t3ItuRnn8BePVXPC4DidmVU6vXBzE5jV5i6dXfaXVKKvECtoh6HTQCoV46MPZXrXkpaQVESYED/mcBdzysev3CAtHRWxWoWbJSmWTlvlcK+xVPZcyZclGWlPXsSlCeDcYHMGao07fu1QsaFEdKuHfy4Yq9E7FNlbQyHnWTbpCc9td9ksS5sVEajxlCSjbz3wBOrNlxWiyijAAxu2oiqvepNy5uimMVOaXDbAFWHapXmceuJcn4wAXReQAViLcD/AW4HXc0i6mYAgAAAABJRU5ErkJggg=="
              alt="qrcode"
            />
          </div>
        </Flex>

        <Flex gap="small">
          <Input.TextArea placeholder="Тема" />
          <StatusButton
            statusFolder={status.DRAFT}
            icon={<FileAddOutlined />}
            source="table"
          >
            Добавить файл
          </StatusButton>
        </Flex>

        <Flex vertical justify="center" align="center" gap="middle">
          <p>Партнер Нефть</p>
          <img
            style={{ width: "200px" }}
            src="http://docs.icloud.kg/image/logo.png"
            alt="logo"
          />
          <p>№ Рапорта</p>
          <Input value={id} type="number" style={{ width: "200px" }} />
        </Flex>
        <Flex>
          <Input.TextArea placeholder="Содержание" />
        </Flex>
      </Flex>
    </Wrapper>
  );
};
