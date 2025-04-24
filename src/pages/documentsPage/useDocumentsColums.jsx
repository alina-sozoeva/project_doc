import { EditOutlined } from "@ant-design/icons";
import styles from "./DocumentsPage.module.scss";
import { RouteButton, StatusButton } from "../../common";
import { Button, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { pathname, status } from "../../enums";
import React from "react";
import foto from "../../assets/28.jpg";

export const useDocumentsColums = () => {
  const navigate = useNavigate();

  const onStatus = (record) => {
    console.log(record);
    navigate(`/edit-folder/${record.guid}/${record.status}`);
  };

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 20,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Инициатор",
      dataIndex: "data",
      key: "data",
      render: (_, record) => {
        return (
          <div className={styles.table_user_info}>
            <img src={foto} alt="product" className={styles.cart_img} />
            <div>
              <p>Testov Test</p>
              <p>testov@gmail.com</p>
            </div>
          </div>
        );
      },
      width: 100,
    },
    {
      title: "Название документа",
      dataIndex: "data",
      key: "data",
      width: 150,
      render: (_, record) => record.data.doc_name,
    },
    {
      title: "Контрагент",
      dataIndex: "contragent",
      key: "contragent",
      width: 150,
      render: (_, record) => record.data.contract_number,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 100,
      render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Маршрут",
      dataIndex: "data",
      key: "data",
      align: "center",
      width: 200,
      render: (_, record) => (
        <div className="chain_container">
          {record.record.map((step, index) => (
            <React.Fragment key={index}>
              <RouteButton statusFolder={step.status} item={record}>
                {step.step}
              </RouteButton>
              {index < record.record.length - 1 && <div className="arrow" />}
            </React.Fragment>
          ))}
        </div>
      ),
    },
    {
      title: "...",
      key: "record",
      align: "center",
      width: 50,
      render: (record) => (
        <>
          {record.data.doc_name === "Договор 004" ||
          record.data.doc_name === "Договор 005" ? (
            <Button
              type="primary"
              className={styles.btn}
              // onClick={() => onStatus(record.guid)}
            >
              Утвердить
            </Button>
          ) : (
            <Button type="primary" className={styles.btn}>
              В работу
            </Button>
          )}
        </>
      ),
    },
  ];

  return {
    columns,
  };
};
