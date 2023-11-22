import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PRICE, TRANSFER, baseURL } from "../../../shared/config/constants";
import { TResponsePrice } from "..";

interface CoinModalStore {
  isLoading: boolean;
  tokenPrice: number;
  close: boolean;
  setClose: (value: boolean) => void;
  getCoinPrice: (id: number) => Promise<void>;
  buyToken: (id: number, amount: number) => void;
}

export const useModalCoinStore = create<CoinModalStore>()(
  devtools((set) => ({
    isLoading: false,
    tokenPrice: 0,
    close: false,
    async getCoinPrice(id: number) {
      set((state) => ({ ...state, isLoading: true }));
      try {
        const response = await axios.get<TResponsePrice>(
          `${baseURL}${id}/${PRICE}`
        );
        set((state) => ({ ...state, tokenPrice: response.data.data.price }));
      } catch (e) {
        console.log(e);
      } finally {
        set((state) => ({ ...state, isLoading: false }));
      }
    },
    async buyToken(id: number, amount: number) {
      set((state) => ({ ...state, isLoading: true }));
      try {
        const response = await axios(`${baseURL}${id}/${TRANSFER}`, {
          method: "POST",
          data: {
            amount,
          },
        });
        if (response.data.message === "Успешно") {
          set((state) => ({ ...state, close: true }));
        }
      } catch (e) {
        console.log(e);
      } finally {
        set((state) => ({ ...state, isLoading: false }));
      }
    },
    setClose(value: boolean) {
      set((state) => ({ ...state, close: value }));
    },
  }))
);
