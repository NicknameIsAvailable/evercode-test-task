import { useCurrency } from '@/entities/currency';
import { cn } from '@/shared/lib/utils.ts';
import LineChart from '@/shared/ui/line-chart.tsx';
import { CurrencyChartOptions } from '@/widgets/currency-chart';

export const CurrencyChart = () => {
  const { hourlyExchange, getHourlyExchangeQuery } = useCurrency();

  const { isError, isFetching, isSuccess } = getHourlyExchangeQuery;

  return (
    <div className="w-[720px] h-full bg-white rounded p-5 flex flex-col gap-5">
      <CurrencyChartOptions />
      <div
        className={cn(
          'w-full h-[450px] rounded border border-black',
          isFetching && 'animate-pulse',
        )}
      >
        {isFetching && (
          <div className="flex justify-center items-center h-full">
            <h3 className="text-2xl font-bold">Загрузка...</h3>
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center h-full">
            <h3 className="text-2xl font-bold">Не удалось получить данные</h3>
          </div>
        )}
        {isSuccess &&
          !isFetching &&
          hourlyExchange &&
          hourlyExchange.length > 0 && (
            <LineChart data={hourlyExchange || []} />
          )}
        {isSuccess &&
          !isFetching &&
          hourlyExchange &&
          hourlyExchange.length === 0 && (
            <div className="flex justify-center items-center h-full flex-col gap-2">
              <h3 className="text-2xl font-bold">Нет данных</h3>
              <h3 className="text-xl font-base">
                Попробуйте выбрать другую валюту
              </h3>
            </div>
          )}
      </div>
    </div>
  );
};
