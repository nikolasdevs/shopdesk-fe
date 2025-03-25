"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

interface ProfitColumnHeaderProps<TData> {
  table: Table<TData>;
}

export function ProfitColumnHeader<TData>({
  table,
}: ProfitColumnHeaderProps<TData>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSortKey, setActiveSortKey] = useState<string | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    table.setOptions((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        isProfitExpanded: !isExpanded,
      },
    }));
    table.reset();
  };

  const handleSort = (key: string) => {
    setActiveSortKey(key);
    table.setSorting([
      {
        id: "profit",
        desc:
          activeSortKey === key ? !table.getState().sorting[0]?.desc : false,
      },
    ]);
  };

  const profitColumns = [
    { key: "cost_price", label: "Cost Price" },
    { key: "profit", label: "Profit" },
  ];

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex gap-2.5 py-2">
        <Button
          variant="ghost"
          onClick={toggleExpand}
          disabled={isExpanded}
          className={`bg-[#F6F8FA] hover:bg-[#F6F8FA]/80 duration-150 transition-all rounded-[6px] uppercase text-lg text-[#090F1C] px-4 w-fit ${
            !isExpanded ? "border border-[#DEE5ED] py-1.5 h-auto" : "!text-sm"
          }`}
        >
          {isExpanded ? "PROFIT" : "SHOW PROFIT"}
        </Button>
        {isExpanded && (
          <Button
            variant="ghost"
            onClick={toggleExpand}
            className={`bg-[#F6F8FA] hover:bg-[#F6F8FA]/80 duration-150 transition-all rounded-[6px] uppercase text-[#090F1C] w-fit border border-[#DEE5ED] text-xs  h-auto py-1 px-2`}
          >
            HIDE PROFIT
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="grid grid-cols-2 border-t w-full place-items-center items-center justify-center text-xs">
          {profitColumns.map(({ key, label }) => (
            <div
              key={key}
              className="w-full relative flex items-center justify-center"
            >
              <Button
                variant="ghost"
                onClick={() => handleSort(key)}
                className={cn(
                  "h-8 w-fit font-medium px-0 py-0 rounded-none",
                  "flex items-center justify-center gap-0 border-r border-solid border-[#E9EEF3]",
                  "hover:bg-transparent transition-colors",
                  activeSortKey === key && "bg-muted "
                )}
              >
                <span className="whitespace-nowrap uppercase text-[#090F1C]">
                  {label}
                </span>
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
