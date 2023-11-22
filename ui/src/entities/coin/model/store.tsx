import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TCoin, TRequestCoinsParams } from "./model";
import { COINS, baseURL, BALANCE } from "../../../shared/config/constants";
import axios from "axios";

interface CoinStoreState {
  coins: TCoin[];
  balance: number;
  isLoading: boolean;
  total: number;
  getCoins: () => TCoin[];
  fetchCoins: (page: number, title?: string, limit?: number) => Promise<void>;
  getBalance(): number;
  fetchBalance: () => void;
}

export const useCoinStore = create<CoinStoreState>()(
  devtools((set, get) => ({
    coins: [],
    balance: 0,
    isLoading: false,
    total: 0,
    async fetchBalance() {
      set((state) => ({ ...state, isLoading: true }));
      try {
        const response = await axios.get(`${baseURL}${BALANCE}`);
        set((state) => ({
          ...state,
          balance: response.data.data.balance,
        }));
      } catch (e) {
        console.log(e);
      } finally {
        set((state) => ({ ...state, isLoading: false }));
      }
    },
    async fetchCoins(page: number, title?: string, limit?: number) {
      set((state) => ({ ...state, isLoading: true }));
      try {
        const params: TRequestCoinsParams = {
          limit: limit || 5,
          page: page || 1,
        };
        if (title) {
          params.title = title;
        }
        const response = await axios.get(`${baseURL}${COINS}`, {
          params: params,
        });
        set((state) => ({
          ...state,
          coins: response.data.data,
          total: response.data.meta.total,
        }));
      } catch (e) {
        console.log(e);
      } finally {
        set((state) => ({ ...state, isLoading: false }));
      }
    },
    getBalance() {
      return get().balance;
    },
    getCoins() {
      return get().coins;
    },
  }))
);
