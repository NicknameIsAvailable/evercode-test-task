import { Button as HeadlessUIButton, ButtonProps } from '@headlessui/react';
import { FC } from 'react';

import { cn } from '@/shared/lib/utils.ts';

const Button: FC<{ primary?: boolean } & ButtonProps> = ({
  children,
  primary,
  ...props
}) => {
  return (
    <HeadlessUIButton
      {...props}
      className={cn(
        'rounded border border-gray-800 py-2.5 px-5 flex gap-2.5 item items-center text-base font-normal text-gray-800 hover:brightness-110 active:-translate-y-1 duration-150',
        primary && 'bg-black text-white',
      )}
    >
      {children}
    </HeadlessUIButton>
  );
};

export default Button;
