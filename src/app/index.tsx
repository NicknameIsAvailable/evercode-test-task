import ReactDOM from 'react-dom/client';

import App from './app.tsx';

import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CurrencyContextProvider } from '@/entities/currency';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <CurrencyContextProvider>
      <App />
    </CurrencyContextProvider>
  </QueryClientProvider>,
);
