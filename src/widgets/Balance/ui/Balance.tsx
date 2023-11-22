import { Typography } from "antd";
import { useCoinStore } from "../../../entities/coin/model/store";
import { useEffect } from "react";

const Balance = () => {
  const { balance, fetchBalance } = useCoinStore((state) => ({
    fetchBalance: state.fetchBalance,
    balance: state.getBalance(),
  }));

  useEffect(() => {
    fetchBalance();
  }, []);

  return <Typography>Баланс: {balance}</Typography>;
};

export { Balance };
