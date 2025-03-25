"use client";

import { fetchStocks } from "@/actions/stocks";
// import { useGetStocksMutation } from "@/redux/features/stock/stock.api";
// import { useAppSelector } from "@/redux/hooks";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { useCreateStockMutation } from '@/redux/features/stock/stock.api';
// import { startStocksLoading } from '@/redux/features/stock/stock.slice';

export default function StockPage() {
  // const { orgId } = useAppSelector((state) => state.auth);
  // const [getStock, { data, isLoading, isSuccess }] = useGetStocksMutation();
  // const [optimisticData, setOptimisticData] = useOptimistic(null);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   getStock(orgId ?? "160db8736a9d47989381e01a987e4413").unwrap();
  // }, [orgId, getStock]);
  // console.log(data, "data", isLoading);
  // console.log("orgId", organizationId);

  const { organizationId } = useStore();
  const [stocks, setStocks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (organizationId) {
      async function fetchData() {
        setLoading(true);
        setError(null);
        try {
          const response = await fetchStocks(organizationId);
          setStocks(response);
        } catch (err) {
          setError("Failed to fetch stocks");
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
    console.log(stocks);
  }, [organizationId]);

  return (
    <div className="container">
      {loading ? (
        <p>Loading stocks...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <DataTable data={stocks ?? []} columns={columns} />
      )}
    </div>
  );
}
