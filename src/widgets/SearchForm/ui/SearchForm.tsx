import { FC, useEffect, useState } from "react";
import { Form, Input } from "antd";

import { useCoinStore } from "../../../entities/coin/model/store";

interface SearchFormProps {
  page: number;
}

const SearchForm: FC<SearchFormProps> = ({ page }) => {
  const { fetchCoins } = useCoinStore((state) => ({
    fetchCoins: state.fetchCoins,
  }));
  const [search, setSearch] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    if (e.currentTarget.value.length === 0) {
      fetchCoins(page);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (search.length > 2) {
        fetchCoins(1, search, 5);
      }
    }, 1500);
    return () => {
      clearTimeout(id);
    };
  }, [search]);

  return (
    <>
      <Form>
        <Input onChange={handleInput} value={search} />
      </Form>
    </>
  );
};

export { SearchForm };
