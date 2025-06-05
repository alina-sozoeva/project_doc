import { Flex } from "antd";
import { AllDocsCard } from "../../components";
import { useGetDocCountsQuery } from "../../store/api/documents.api";
import { useUser } from "../../utils";

import styles from "./AllDocs.module.scss";
import { useNavigate } from "react-router-dom";

export const AllDocs = () => {
  const user = useUser();
  const navigate = useNavigate();

  const { data } = useGetDocCountsQuery({ employee_id: user?.guid });

  console.log();

  return (
    <Flex vertical className={styles.wrap}>
      {data?.docs?.length === 0 && (
        <span className="text-center">Нет входящих данных</span>
      )}
      {data?.docs?.map((item) => (
        <AllDocsCard
          item={item}
          onClick={() => navigate(`/document/${item?.guid}`)}
        />
      ))}
    </Flex>
  );
};
