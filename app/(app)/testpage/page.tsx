"use client";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Column,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { columns, Sale } from "./_sales-components/columns";
import { DataTable } from "./_sales-components/data-table";
import { DataTablePagination } from "./_sales-components/data-table-pagination";

const sampleData = [
  {
    id: "3",
    date: "Sun 24 Nov 2024",
    time: "12:24 pm",
    itemName: "Solace Recliner",
    quantitySold: 3,
    sellPrice: 156000,
    profit: 20000,
  },
  {
    id: "4",
    date: "Sun 24 Nov 2024",
    time: "12:24 pm",
    itemName: "White Center Table",
    quantitySold: 3,
    sellPrice: 130000,
    profit: 20000,
  },
  {
    id: "5",
    date: "Sun 24 Nov 2024",
    time: "15:24 pm",
    itemName: "Solace Recliner",
    quantitySold: 3,
    sellPrice: 156000,
    profit: 20000,
  },
  {
    id: "6",
    date: "Sun 24 Nov 2024",
    time: "15:24 pm",
    itemName: "White Center Table",
    quantitySold: 3,
    sellPrice: 130000,
    profit: 20000,
  },
];

function processDataIntoGroups(data: Sale[]) {
  // Sort data by date and time
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(`${a.date} ${a.time}`).getTime() -
      new Date(`${b.date} ${b.time}`).getTime()
  );

  // Group data by time
  const groupedByTime = sortedData.reduce((acc, item) => {
    const key = `${item.date} ${item.time}`;
    if (!acc[key]) {
      acc[key] = {
        timeKey: key,
        items: [],
        total: {
          id: `total-${key}`,
          date: item.date,
          time: item.time,
          itemName: "Total",
          quantitySold: 0,
          sellPrice: 0,
          profit: 0,
        },
      };
    }
    acc[key].items.push(item);
    acc[key].total.quantitySold += item.quantitySold;
    acc[key].total.sellPrice += item.sellPrice * item.quantitySold;
    acc[key].total.profit += item.profit || 0;
    return acc;
  }, {} as Record<string, { timeKey: string; items: Sale[]; total: Sale }>);

  return Object.values(groupedByTime);
}

export default function Page() {
  const [groupedData, setGroupedData] = useState<
    { timeKey: string; items: Sale[]; total: Sale }[]
  >([]);
  const [viewType, setViewType] = React.useState<"Daily" | "Weekly" | "Flat">(
    "Daily"
  );

  useEffect(() => {
    setGroupedData(processDataIntoGroups(sampleData));
  }, [sampleData]);

  // Create a table instance for pagination
  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-8">
      {/* Standalone header */}
      <div className="min-w-[900px] border border-gray-200 rounded-lg mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={Math.random() * 10000000}>
                  {typeof column.header === "function"
                    ? column.header({
                        column: column as Column<Sale, unknown>,
                        header: column.header,
                        table: {},
                      })
                    : column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        </Table>
      </div>

      {/* Tables for each time group */}
      <div className="space-y-4">
        {groupedData.map((group) => (
          <div
            key={group.timeKey}
            className="border border-gray-200 rounded-lg"
          >
            <DataTable
              data={[group.total, ...group.items]}
              columns={columns}
              showHeader={false}
            />
          </div>
        ))}
      </div>

      {/* Pagination at the bottom */}
      <div className="min-w-[900px] border border-gray-200 rounded-lg mt-4">
        <div className="px-4 py-3">
          <DataTablePagination
            table={table}
            viewType={viewType}
            setViewType={setViewType}
          />
        </div>
      </div>
    </div>
  );
}
