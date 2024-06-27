import { DialogTitle } from '@headlessui/react';
import { useState } from 'react';

import Arrow from '@/assets/dropdown-arrow.svg';
import { useCurrency } from '@/entities/currency';
import Button from '@/shared/ui/button';
import Dialog from '@/shared/ui/dialog.tsx';

type TimestampIdType = 'yesterday' | 'threeDays' | 'week' | 'month';

interface ITimestampVariant {
  id: TimestampIdType;
  name: string;
  days: number;
}

const timestampVariants: ITimestampVariant[] = [
  {
    id: 'yesterday',
    name: 'Day',
    days: 1,
  },
  {
    id: 'threeDays',
    name: '3 Days',
    days: 3,
  },
  {
    id: 'week',
    name: 'Week',
    days: 7,
  },
  {
    id: 'month',
    name: 'Month',
    days: 30,
  },
];

export const CurrencyChartOptions = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const {
    setAggregate,
    aggregate,
    tokens,
    setTsym,
    tsym,
    getHourlyExchangeQuery,
  } = useCurrency();

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle className="text-xl font-bold">Выберите валюту</DialogTitle>
        <div className="flex flex-col gap-2 max-h-96 overflow-x-auto">
          {tokens &&
            Object.keys(tokens).map((token) => (
              <Button
                key={token}
                primary={token === tsym}
                onClick={() => {
                  setTsym(token);
                  handleDialogClose();
                }}
              >
                {token}
              </Button>
            ))}
        </div>
        <Button onClick={handleDialogClose}>Отмена</Button>
      </Dialog>
      <div className="flex justify-between items-center">
        <div className="flex gap-2.5">
          {timestampVariants.map((ts) => (
            <Button
              key={ts.id}
              primary={ts.days === aggregate}
              onClick={() => setAggregate && setAggregate(ts.days)}
            >
              {ts.name}
            </Button>
          ))}
        </div>
        <Button onClick={() => getHourlyExchangeQuery.refetch()}>
          Refresh
        </Button>
        <Button onClick={handleDialogOpen}>
          <img alt="Стрелка" src={Arrow} />
          {tsym || 'Выбрать валюту'}
        </Button>
      </div>
    </>
  );
};
