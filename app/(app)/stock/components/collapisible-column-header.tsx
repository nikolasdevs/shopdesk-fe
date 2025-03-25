"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

interface ColumnHeaderProps<TData> {
  table: Table<TData>;
  columnId: string;
  label: string;
  toggleLabel: string;
  items: { key: string; label: string }[];
  metaKey: string;
}

export function ColumnHeader<TData>({
  table,
  columnId,
  label,
  toggleLabel,
  items,
  metaKey,
}: ColumnHeaderProps<TData>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSortKey, setActiveSortKey] = useState<string | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    table.setOptions((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [metaKey]: !isExpanded,
      },
    }));
    table.reset();
  };

  const handleSort = (key: string) => {
    setActiveSortKey(key);
    table.setSorting([
      {
        id: columnId,
        desc:
          activeSortKey === key ? !table.getState().sorting[0]?.desc : false,
      },
    ]);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <Button
        variant="ghost"
        onClick={toggleExpand}
        className={cn(
          "bg-[#F6F8FA] hover:bg-[#F6F8FA]/80 duration-150 transition-all rounded-[6px] uppercase text-lg text-[#090F1C] px-4 w-fit",
          !isExpanded ? "border border-[#DEE5ED] py-1.5 h-auto" : "!text-sm"
        )}
      >
        {isExpanded ? label : toggleLabel}
      </Button>

      {isExpanded && (
        <div
          className={`grid grid-cols-${items.length} border-t place-items-center items-center justify-center text-xs`}
        >
          {items.map(({ key, label }) => (
            <div
              key={key}
              className="w-fit relative flex items-center justify-center"
            >
              <Button
                variant="ghost"
                onClick={() => handleSort(key)}
                className={cn(
                  "h-8 w-fit font-medium px-0 py-0 rounded-none",
                  "flex items-center justify-center gap-0 border-r border-solid border-[#E9EEF3]",
                  "hover:bg-transparent transition-colors",
                  activeSortKey === key && "bg-muted"
                )}
              >
                <span className="whitespace-nowrap uppercase">{label}</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  {activeSortKey === key && (
                    <Icons.ArrowSort className="h-2 w-2" />
                  )}
                </div>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
