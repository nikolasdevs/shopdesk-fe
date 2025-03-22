'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { Stock } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { EditableCell } from './editable-cell';

export const columns: ColumnDef<Stock>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]  translate-x-[85%] '
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='absolute left-1/2 -translate-x-1/2 bottom-1/3 -translate-y-1/2'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ITEM NAME' />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('name');
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
    accessorKey: 'sell_price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SELL PRICE' />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('sell_price');
      return (
        <EditableCell
          value={value}
          onChange={(val) => {
            row.original.sell_price = val;
          }}
        />
      );
    },
  },
  {
    accessorKey: 'available',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='AVAILABLE' />
    ),
    cell: ({ row }) => {
      const value = row.getValue<string>('available');
      return (
        <EditableCell
          value={value}
          onChange={(val) => {
            row.original.available = val;
          }}
        />
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
