import { InputNumber, Modal, Typography } from "antd";
import { TCoin, useCoinStore } from "../../../entities/coin";
import { FC, useEffect, useMemo, useRef } from "react";
import { Loader } from "../../../shared/ui/Loader";
import { useModalCoinStore } from "../../../entities/coin/model/modalStore";

interface ModalCoinProps {
  coin: TCoin | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const ModalCoin: FC<ModalCoinProps> = ({ onCancel, coin, onConfirm }) => {
  const { balance } = useCoinStore((state) => ({
    balance: state.balance,
  }));

  const { isLoading, getCoinPrice, tokenPrice, buyToken, close, setClose } =
    useModalCoinStore((state) => ({
      close: state.close,
      isLoading: state.isLoading,
      tokenPrice: state.tokenPrice,
      getCoinPrice: state.getCoinPrice,
      buyToken: state.buyToken,
      setClose: state.setClose,
    }));

  const maxCoinCount = useMemo(() => {
    return Math.floor(balance / tokenPrice);
  }, [balance, tokenPrice]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (coin) {
      getCoinPrice(coin.id);
    }
  }, []);

  const handleBuy = (coin: TCoin | null, amount: number) => {
    if (coin && amount <= maxCoinCount && amount > 0) {
      buyToken(coin.id, amount);
      onConfirm();
    }
  };

  useEffect(() => {
    if (close) {
      onCancel();
    }
    return () => {
      setClose(false);
    };
  }, [close]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Modal
          open={Boolean(coin)}
          onOk={() => handleBuy(coin, Number(inputRef.current?.value))}
          title={"Купить монету"}
          onCancel={onCancel}
          okText="Купить"
          cancelText="Отмена"
        >
          <Typography>{coin?.title}</Typography>
          <Typography>Статус: {coin?.status}</Typography>
          <Typography>Сеть: {coin?.network}</Typography>
          <Typography>Цена монеты: {tokenPrice}</Typography>
          <InputNumber
            type="number"
            disabled={!maxCoinCount}
            ref={inputRef}
            max={maxCoinCount}
            min={1}
            value={maxCoinCount}
          />
        </Modal>
      )}
    </>
  );
};

export { ModalCoin };
