import { Dialog as HeadlessUIDialog, DialogPanel } from '@headlessui/react';
import { FC, ReactNode } from 'react';

const Dialog: FC<{
  open: boolean;
  onClose: (value: boolean) => void;
  children: ReactNode;
}> = ({ open, onClose, children }) => {
  return (
    <HeadlessUIDialog open={open} onClose={onClose}>
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/70 duration-300">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-4 min-w-96 rounded-xl">
          {children}
        </DialogPanel>
      </div>
    </HeadlessUIDialog>
  );
};

export default Dialog;
