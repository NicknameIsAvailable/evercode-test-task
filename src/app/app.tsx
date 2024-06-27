import { CurrencyChart } from '@/widgets/currency-chart';

function App() {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-800">
      <div className="container mx-auto flex items-center justify-center">
        <CurrencyChart />
      </div>
    </main>
  );
}

export default App;
