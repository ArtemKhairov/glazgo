export type TCoin = {
  id: number;
  title: string;
  network: number;
  status: number;
};

export type TRequestCoinsParams = {
  limit: number;
  page: number;
  title?: string;
};

export type TResponseCoins = {
  data: TCoin[];
  meta: {
    limit: number;
    page: number;
    page_count: number;
    total: number;
  };
};

export type TResponsePrice = {
  data: {
    price: number;
  };
};

export type TResponseBalance = {
  data: {
    balance: number;
  };
};
