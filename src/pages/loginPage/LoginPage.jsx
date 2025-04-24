import { Button, Flex, Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useGetEmployeesQuery } from "../../store";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({});
  const [vantaEffect, setVantaEffect] = useState(null);
  const navigate = useNavigate();
  const { data } = useGetEmployeesQuery();

  console.log(data);

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
    const user = data?.data?.find((item) => item.email === values.email);
    console.log(user);

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
        <Flex align="center" justify="center">
          <img src={logo} alt="" />
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
