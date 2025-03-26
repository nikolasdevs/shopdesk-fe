"use client";

import { fetchWeekdaySalesCount } from "@/actions/sales";
import { Icons } from "@/components/ui/icons";
import { useStore } from "@/store/useStore";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { Stock } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
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
          currency={row.original.currency_code}
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
          value={value}
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

      const [salesData, setSalesData] = useState<Record<string, number> | null>(
        null
      );
      const [loading, setLoading] = useState(false);
      const { organizationId } = useStore();
      useEffect(() => {
        if (isExpanded) {
          setLoading(true);
          fetchWeekdaySalesCount(organizationId, row.original.id)
            .then((data) => setSalesData(data))
            .catch(() => setSalesData(null))
            .finally(() => setLoading(false));
        }
      }, [isExpanded, organizationId, row.original.id]);

      if (!isExpanded) {
        const totalSales = [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
        ].reduce((acc, day) => acc + (row.original[`sales_${day}`] || 0), 0);

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
        <div className="grid grid-cols-7 gap-2">
          {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
            (day) => (
              <div
                key={day}
                className="border-none p-5 rounded-none text-sm w-full h-full"
              >
                {loading ? "Loading..." : salesData ? salesData[day] : "N/A"}
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
      const calculatedProfit =
        Number(row.original.buying_price) - Number(row.original.cost_price);
      if (!isExpanded) {
        return (
          <div className="flex items-center justify-center">
            {calculatedProfit.toFixed(2) || 0}
          </div>
        );
      }

      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="border-none p-5  rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative">
            {String(row.original.cost_price || 0)}
          </div>
          <div className="border-none p-5  rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative">
            {calculatedProfit.toFixed(2) || 0}
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
