import { Input } from "antd";
import { useEffect, useState } from "react";
import { useCoinStore } from "../../../entities/coin/model/store";

const SearchCoin = () => {
  const [search, setSeacrh] = useState("");
  const { fetchCoins } = useCoinStore((state) => ({
    fetchCoins: state.fetchCoins,
  }));
  useEffect(() => {
    const timeId = setTimeout(() => {
      if(search.length > 1)
      fetchCoins(1, search);
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, [search]);

  return (
    <Input value={search} onChange={(v) => setSeacrh(v.currentTarget.value)} />
  );
};

export { SearchCoin };
