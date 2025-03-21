import { promises as fs } from 'node:fs';
import path from 'node:path';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { stockSchema } from './data/schema';
import { z } from 'zod';

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/(app)/stock/data/stocks.json')
  );

  const tasks = JSON.parse(data.toString());

  return z.array(stockSchema).parse(tasks);
}

export default async function StockPage() {
  const tasks = await getTasks();

  return (
    <div className='container'>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
