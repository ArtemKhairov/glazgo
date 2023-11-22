import { FC, useEffect, useState } from "react";
import { Form, Input } from "antd";
// import { useForm } from "react-hook-form";
// import { FormItem } from "../../../features/FormItem";

import { useCoinStore } from "../../../entities/coin/model/store";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// const schema = z.object({
//   coin: z.string().min(1, { message: "Required" }),
// .max(15, { message: "Username should be less than 15 characters" }),
//   password: z.string().min(1, { message: "Required" }),
//   remember: z.boolean(),
// });

interface SearchFormProps {
  page: number;
}

const SearchForm: FC<SearchFormProps> = ({ page }) => {
  const { fetchCoins } = useCoinStore((state) => ({
    fetchCoins: state.fetchCoins,
  }));
  const [search, setSearch] = useState("");
  // const { control, watch, handleSubmit } = useForm({
  //   defaultValues: { coin: "" },
  // });

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
      <Form
      // style={{ maxWidth: 600 }}
      // onFinish={handleSubmit((data) => {
      //   console.log(data);
      // })}
      >
        {/* <FormItem
          control={control}
          // on
          name="coin"
          label="Поиск монеты"
        > */}
        <Input onChange={handleInput} value={search} />
        {/* </FormItem> */}
      </Form>
    </>
  );
};

export { SearchForm };
