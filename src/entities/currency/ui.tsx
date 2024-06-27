import { useQuery } from '@tanstack/react-query';
import React, { createContext, ReactNode, useState } from 'react';

import { CurrencyAPI } from './api';
import {
  ICurrencyContext,
  IGetHourlyExchangeResponse,
  IGetTokensResponse,
} from './model';

import { IToken } from '@/shared/types/token';
import { IHourlyExchange } from '@/shared/types/hourly-exchange';

export const CurrencyContext = createContext<ICurrencyContext | undefined>(
  undefined,
);

export const CurrencyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<{ [key: string]: IToken | null }>({});
  const [hourlyExchange, setHourlyExchange] = useState<
    IHourlyExchange[] | null
  >(null);
  const [tsym, setTsym] = useState<string | undefined>(undefined);
  const [aggregate, setAggregate] = useState<number | undefined>(undefined);

  const getTokensQuery = useQuery<IGetTokensResponse, Error>({
    queryKey: ['tokens'],
    queryFn: async () => {
      const response = await CurrencyAPI.getTokens();

      if (response?.Response === 'Success') {
        const { Data } = response;
        setTokens(Data);
        setTsym(Object.keys(Data)[0]);
        return response;
      } else {
        throw new Error(response?.Message);
      }
    },
  });

  const getHourlyExchangeQuery = useQuery<
    IGetHourlyExchangeResponse | null,
    Error
  >({
    queryKey: ['hourly-exchange', tsym, aggregate],
    queryFn: async () => {
      if (tsym)
        try {
          const response = await CurrencyAPI.getHourlyExchange(tsym, aggregate);
          if (response?.Data) {
            setHourlyExchange(response.Data);
            return response;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      else return null;
    },
  });

  return (
    <CurrencyContext.Provider
      value={{
        tokens,
        hourlyExchange,
        getTokensQuery,
        getHourlyExchangeQuery,
        tsym,
        setTsym,
        aggregate,
        setAggregate,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = React.useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error(
      'useCurrencyContext must be used within a CurrencyContextProvider',
    );
  }
  return context;
};
