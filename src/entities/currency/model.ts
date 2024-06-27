import { UseQueryResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { IHourlyExchange } from '@/shared/types/hourly-exchange.ts';
import { IResponseBase } from '@/shared/types/response';
import { IToken } from '@/shared/types/token.ts';

export interface IGetTokensResponse extends IResponseBase {
  RateLimit: NonNullable<unknown>;
  Data: {
    [key: string]: IToken;
  };
}

export interface IGetHourlyExchangeResponse extends IResponseBase {
  Data: IHourlyExchange[];
}

export interface ICurrencyAPI {
  getTokens(): Promise<IGetTokensResponse | undefined>;
  getHourlyExchange(
    tsym: string,
    aggregate?: number,
  ): Promise<IGetHourlyExchangeResponse | undefined>;
}

export interface ICurrencyContext {
  tokens: { [key: string]: IToken | null } | null;
  hourlyExchange: IHourlyExchange[] | null;
  tsym?: string;
  setTsym: Dispatch<SetStateAction<string | undefined>>;
  aggregate?: number;
  setAggregate?: Dispatch<SetStateAction<number | undefined>>;
  getTokensQuery: UseQueryResult<IGetTokensResponse | undefined, Error>;
  getHourlyExchangeQuery: UseQueryResult<
    IGetHourlyExchangeResponse | null,
    Error
  >;
}
