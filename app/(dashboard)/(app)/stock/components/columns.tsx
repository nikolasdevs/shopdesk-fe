"use client";

import { fetchWeekdaySalesCount } from "@/actions/sales";
import { Icons } from "@/components/ui/icons";
import { setWeeklySalesData } from "@/redux/features/sale/sale.slice";
import { RootState } from "@/redux/store";
import { useStore } from "@/store/useStore";
import { WeeklySalesData } from "@/types/sale";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import type { Stock } from "./data/schema";
import { EditableCell } from "./editable-cell";
import { ProfitColumnHeader } from "./profit-column/profit-column-header";
import { SalesColumnHeader } from "./sales-column/sales-column-header";

export const columns: ColumnDef<Stock>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <div className='h-full p-2 w-full flex items-center justify-center'>
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && 'indeterminate')
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label='Select all'
  //         className='trans '
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       className='absolute left-1/2 -translate-x-1/2 bottom-1/3 -translate-y-1/2'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ITEM NAME" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>("name");
      return (
        <EditableCell
          value={value}
          accessorKey="name"
          stockId={row.original.id}
          onChange={(val) => {
            row.original.name = val;
            // Optional: sync this update to local state or backend
          }}
        />
      );
    },
  },
  {
    accessorKey: "buying_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SELL PRICE" />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>("buying_price");

      return (
        <EditableCell
          value={value}
          accessorKey="buying_price"
          currency={row.original.currency_code}
          stockId={row.original.id}
          onChange={(val) => {
            row.original.buying_price = val;
          }}
        />
      );
    },
    size: 100,
  },
  {
    accessorKey: "available",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AVAILABLE" />
    ),
    cell: ({ row }) => {
      const value = row.original.quantity;

      // console.log(value, "value");

      return (
        <EditableCell
          value={value || "0"}
          accessorKey="quantity"
          stockId={row.original.id}
          onChange={(val) => {
            row.original.quantity = val;
          }}
        />
      );
    },
    size: 100,
  },
  {
    accessorKey: "sales",
    header: ({ table }) => <SalesColumnHeader table={table} />,
    cell: ({ row, table }) => {
      const isExpanded =
        (table.options.meta as { isSalesExpanded?: boolean })
          ?.isSalesExpanded || false;

      const [loading, setLoading] = useState(false);
      const { organizationId } = useStore();
      const dispatch = useDispatch();
      const [error, setError] = useState<string>("");
      const salesData = useSelector(
        (state: RootState) => state.weeklySales.data
      );
      useEffect(() => {
        if (isExpanded) {
          setLoading(true);
          setError("");

          fetchWeekdaySalesCount(organizationId, row.original.id)
            .then((data) => {
              if (data.error) {
                throw new Error(data.error);
              }
              dispatch(setWeeklySalesData(data));
            })
            .catch((err) => {
              console.error(err);
              setError("Failed to fetch Weekly sales");
              dispatch(
                setWeeklySalesData({
                  monday: 0,
                  tuesday: 0,
                  wednesday: 0,
                  thursday: 0,
                  friday: 0,
                })
              );
            })
            .finally(() => setLoading(false));
        }
      }, [isExpanded, organizationId, row.original.id]);

      if (!isExpanded) {
        const totalSales = Object.values(salesData || {}).reduce(
          (acc, val) => acc + val,
          0
        );
        console.log(totalSales);
        return (
          <div className="flex items-center justify-center">{totalSales}</div>
        );
      }

      if (!isExpanded) {
        return (
          <div className="flex items-center justify-center">
            {String(row.getValue("sales") || 0)}
          </div>
        );
      }

      return (
        <div className="grid grid-cols-5 gap-2 w-full">
          {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
            (day) => (
              <div
                key={day}
                className="border-r p-5 last:pr-5 rounded-none text-sm w-full h-full"
              >
                {error ? "0" : salesData?.[day as keyof WeeklySalesData] ?? "0"}
              </div>
            )
          )}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "profitGroup",
    header: ({ table }) => <ProfitColumnHeader table={table} />,
    cell: ({ row, table }) => {
      const isExpanded =
        (table.options.meta as { isProfitExpanded?: boolean })
          ?.isProfitExpanded || false;
      // const calculatedProfit =
      //   Number(row.original.buying_price) - Number(row.original.cost_price);
      if (!isExpanded) {
        return <div className="flex items-center justify-center">{0}</div>;
      }

      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="border-none p-5  rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative">
            {0}
          </div>
          <div className="border-none p-5  rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative">
            {0}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <div
          className="h-full py-5 px-4 flex items-center justify-center bg-transparent hover:bg-black/10 transition-all duration-150 shadow-none cursor-pointer"
          title="Add new Column"
        >
          <div className="py-1.5 px-2">
            <Icons.plus className="shrink-0" />
          </div>
        </div>
      );
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
