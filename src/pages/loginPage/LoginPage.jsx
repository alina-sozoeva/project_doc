import { Button, Flex, Form, Input, Modal, Select, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import { StatusButton } from "../../common";
import { status } from "../../enums";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({});
  const [vantaEffect, setVantaEffect] = useState(null);
  const navigate = useNavigate();

  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          backgroundColor: 0x0,
          color: 0x1890ff,
          size: 1.2,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const onFinish = (values) => {
    console.log(values);

    const user = {
      ...userInfo,
      email: values.email,
      password: values.password,
    };

    setUserInfo(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
    form.resetFields();
    navigate("/");
  };

  return (
    <div className={styles.content}>
      <div ref={myRef} className={styles.bg}></div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        className={styles.form}
      >
        <Flex>
          <Typography.Title level={3} style={{ zIndex: 12 }}>
            Войти
          </Typography.Title>
        </Flex>
        <Flex vertical>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message:
                  "Адрес электронной почты недействителен. Убедитесь, что он указан в таком формате: example@email.com.",
              },
            ]}
          >
            <Input type="email" placeholder="Введите email" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: "Это обязательное поле для заполнения",
              },
            ]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>
        </Flex>
        <Flex vertical>
          <Button color="primary" variant="filled" htmlType="submit">
            Войти
          </Button>
        </Flex>
      </Form>
    </div>
  );
};
