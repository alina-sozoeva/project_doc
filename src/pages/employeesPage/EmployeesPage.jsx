import { Button, Flex, Input, Table } from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { useEmployeesColums } from "./useEmployeesColums";
import { AddEmployeeModal, Wrapper } from "../../common";
import styles from "./EmployeesPage.module.scss";
import { useNavigate } from "react-router-dom";
import { pages, pathname } from "../../enums";
import { useCallback, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
];

export const EmployeesPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { columns } = useEmployeesColums();
  const data = JSON.parse(localStorage.getItem("employeesArr"));

  const onClose = () => {
    setOpen(false);
  };

  const initialNodes = [
    { id: "1", position: { x: 500, y: 0 }, data: { label: "Владелец" } },
    {
      id: "2",
      position: { x: 200, y: 100 },
      data: {
        label: (
          <>
            <Button>Добавить отдел</Button>
          </>
        ),
      },
    },
    {
      id: "3",
      position: { x: 800, y: 100 },
      data: {
        label: (
          <Button
            type="primary"
            onClick={() => setOpen(true)}
            style={{ width: "100%" }}
          >
            <UserAddOutlined />
            Добавить сотрудника
          </Button>
        ),
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <Wrapper
      className={styles.content}
      path={pathname.EMPLOYEES}
      title={pages.EMPLOYEES}
      page={true}
    >
      <Flex justify="space-between" align="center">
        <Input
          placeholder="Поиск по ФИО"
          prefix={<SearchOutlined />}
          style={{
            width: "20%",
          }}
        />
      </Flex>
      <Flex vertical gap={"small"} align="center" justify="center">
        {/* <Button>Владелец</Button> */}
        {/* <Button type="primary" onClick={() => setOpen(true)}>
          <UserAddOutlined />
          Добавить сотрудника
        </Button> */}
      </Flex>
      <Flex style={{ height: "500px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          {/* <MiniMap /> */}
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </Flex>

      {/* <Table scroll={{ y: 480 }} dataSource={data} columns={columns} bordered /> */}
      <AddEmployeeModal open={open} onCancel={onClose} />
    </Wrapper>
  );
};
