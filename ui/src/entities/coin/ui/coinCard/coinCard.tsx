import { Card, Typography } from "antd";
import { TCoin } from "../../model/model";
import { FC } from "react";

interface CoinCardProps extends TCoin {
  onClick: (coin: TCoin) => void;
}

const CoinCard: FC<CoinCardProps> = ({
  id,
  title,
  network,
  status,
  onClick,
}) => {
  return (
    <Card title={title} onClick={() => onClick({ id, title, network, status })}>
      <Typography>Сеть: {status}</Typography>
      <Typography>Сеть: {network}</Typography>
    </Card>
  );
};

export { CoinCard };
