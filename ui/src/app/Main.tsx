import { FC, useState } from "react";
import { Balance } from "../widgets/Balance";
import { SearchForm } from "../widgets/SearchForm/ui/SearchForm";
import { Space, Pagination } from "antd";
import { CoinList } from "../widgets/CoinList/ui/CoinList";
import { useCoinStore } from "../entities/coin";

const Main: FC = () => {
  const { total, isLoading } = useCoinStore((state) => ({
    total: state.total,
    isLoading: state.isLoading,
  }));
  const [page, setPage] = useState(1);
  const handlePage = (e: number) => {
    setPage(e);
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Balance />
      <SearchForm page={page} />
      <CoinList page={page} />
      {total > 0 && !isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            pageSize={5}
            current={page}
            onChange={handlePage}
            total={total}
          />
        </div>
      )}
    </Space>
  );
};

export { Main };
