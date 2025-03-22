'use client';

import { useGetStocksMutation } from '@/redux/features/stock/stock.api';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { useGetUserQuery } from '@/redux/features/auth/auth.api';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { useCreateStockMutation } from '@/redux/features/stock/stock.api';
// import { startStocksLoading } from '@/redux/features/stock/stock.slice';

export default function StockPage() {
  const { orgId } = useAppSelector((state) => state.auth);

  const [getStock, { data }] = useGetStocksMutation();

  useEffect(() => {
    getStock(orgId ?? '160db8736a9d47989381e01a987e4413')
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='container'>
      {/* <DataTable data={data} columns={columns} /> */}
    </div>
  );
}
