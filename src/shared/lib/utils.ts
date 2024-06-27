import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (
  interval: 'yesterday' | 'threeDays' | 'week' | 'month',
): number => {
  const now = new Date();

  const newTimestamps = {
    yesterday: new Date(now.setDate(now.getDate() - 1)),
    threeDays: new Date(now.setDate(now.getDate() - 3)),
    week: new Date(now.setDate(now.getDate() - 7)),
    month: new Date(now.setMonth(now.getMonth() - 1)),
  };

  const date: Date = newTimestamps[interval];
  return Math.floor(date.getTime() / 1000);
};
