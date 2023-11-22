import { FC, useEffect, useState } from "react";
import { Empty, Col, Row, Flex, message } from "antd";
import { CoinCard, TCoin } from "../../../entities/coin";
import { Loader } from "../../../shared/ui/Loader";
import { useCoinStore } from "../../../entities/coin/model/store";
import { ModalCoin } from "../../ModalCoin/ui/ModalCoin";
import React from "react";
import { shallow } from "zustand/shallow";

type CoinListProps = {
  page: number;
};

const CoinList: FC<CoinListProps> = ({ page }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { coins, isLoading, fetchCoins } = useCoinStore(
    (state) => ({
      coins: state.coins,
      isLoading: state.isLoading,
      fetchCoins: state.fetchCoins,
    }),
    shallow
  );

  useEffect(() => {
    fetchCoins(page);
  }, [page]);

  const [coin, setCoin] = useState<TCoin | null>(null);

  const handleToken = (token: TCoin) => {
    setCoin(token);
    console.log(token);
  };

  if (isLoading) {
    return (
      <Row gutter={[8, 16]}>
        <Col>
          <div style={{ minWidth: 700, minHeight: 150 }}>
            <Loader />
          </div>
        </Col>
      </Row>
    );
  }

  const List: FC<{ coins: TCoin[] }> = React.memo(({ coins }) => {
    return (
      <>
        {coins.map((elem: TCoin) => (
          <CoinCard key={elem.id} {...elem} onClick={handleToken} />
        ))}
      </>
    );
  });

  return (
    <Flex wrap="wrap" gap="small">
      {contextHolder}
      {coins.length > 0 ? <List coins={coins} /> : <Empty />}
      {coin && (
        <ModalCoin
          coin={coin}
          onCancel={() => setCoin(null)}
          onConfirm={() => messageApi.success("Успешно!")}
        />
      )}
    </Flex>
  );
};

export { CoinList };
