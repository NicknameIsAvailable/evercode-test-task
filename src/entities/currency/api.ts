import {
  ICurrencyAPI,
  IGetHourlyExchangeResponse,
  IGetTokensResponse,
} from './model';

import api from '@/features/api';


export const CurrencyAPI: ICurrencyAPI = {
  async getTokens(): Promise<IGetTokensResponse | undefined> {
    try {
      const { data } = await api.get('/data/blockchain/list');
      return data;
    } catch (err) {
      console.error(err);
    }
  },
  async getHourlyExchange(
    tsym,
    aggregate,
  ): Promise<IGetHourlyExchangeResponse | undefined> {
    try {
      const response = await api.get('/data/exchange/histohour', {
        params: {
          tsym,
          aggregate,
        },
      });
      const { data } = response;
      return data;
    } catch (err) {
      console.error(err);
    }
  },
};
