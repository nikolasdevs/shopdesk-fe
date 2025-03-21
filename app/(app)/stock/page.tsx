import { promises as fs } from 'node:fs';
import path from 'node:path';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { stockSchema } from './data/schema';
import { z } from 'zod';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { useCreateStockMutation } from '@/redux/features/stock/stock.api';
// import { startStocksLoading } from '@/redux/features/stock/stock.slice';

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/(app)/stock/data/stocks.json')
  );

  const tasks = JSON.parse(data.toString());

  return z.array(stockSchema).parse(tasks);
}

export default async function StockPage() {
  const tasks = await getTasks();

  // const { isLoading } = useAppSelector((state) => state.stocks);
  // const dispatch = useAppDispatch();

  // const [createStock, { is }] = useCreateStockMutation();

  // const handleCreateStock = async () => {
  //   try {
  //     dispatch(startStocksLoading());
  //     await createStock({
  //       name: 'New Item',
  //       sell_price: '0.00',
  //       available: '0',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //   }
  // };

  // const { orgId } = useAppSelector((state) => state.auth);

  return (
    <div className='container'>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
