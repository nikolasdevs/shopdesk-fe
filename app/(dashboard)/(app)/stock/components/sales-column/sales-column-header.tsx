"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface SalesColumnHeaderProps<TData> {
  table: Table<TData>;
}

export function SalesColumnHeader<TData>({
  table,
}: SalesColumnHeaderProps<TData>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSortDay, setActiveSortDay] = useState<string | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    table.setOptions((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        isSalesExpanded: !isExpanded,
      },
    }));
    table.reset();
  };

  const handleDaySort = (day: string) => {
    setActiveSortDay(day);
    table.setSorting([
      {
        id: "sales",
        desc:
          activeSortDay === day ? !table.getState().sorting[0]?.desc : false,
      },
    ]);
  };
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div
      className={`flex justify-center items-center flex-col w-full relative h-full overflow-hidden ${
        isExpanded ? "min-w-[250px]" : ""
      }`}
    >
      <div className="w-full relative flex justify-center items-center h-6/10 px-2">
        <Button
          variant="ghost"
          onClick={toggleExpand}
          disabled={isExpanded}
          className={`bg-[#F6F8FA] hover:bg-[#F6F8FA]/80 duration-150 transition-all text-xs rounded-[6px] uppercase lg:text-lg text-center text-[#090F1C] lg:px-4 w-fit ${
            !isExpanded ? "border border-[#DEE5ED] py-1.5 h-auto" : "!text-sm "
          }`}
        >
          {isExpanded ? "SALES" : "SHOW SALES"}
        </Button>
        {isExpanded && (
          <Button
            onClick={toggleExpand}
            className="bg-[#F6F8FA] py-2 px-1 text-black hover:bg-[#F6F8FA]/80 duration-150 transition-all absolute right-0 w-fit h-fit text-2xl"
          >
            <XIcon />
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="h-38/100 w-full grid grid-cols-5 border-t place-items-center items-center justify-center text-xs">
          {days.map((day) => (
            <div
              key={day}
              className="w-full relative flex items-center justify-center h-full border-r border-solid border-[#E9EEF3]"
            >
              <Button
                key={day}
                variant="ghost"
                onClick={() => handleDaySort(day.toLowerCase())}
                className={cn(
                  "h-8 w-full font-medium px-0 py-0 rounded-none",
                  "flex items-center justify-center gap-0 px-1",
                  "hover:bg-transparent transition-colors",
                  activeSortDay === day.toLowerCase() && "bg-muted"
                )}
              >
                <span className="whitespace-nowrap uppercase">{day}</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  {activeSortDay === day.toLowerCase() && (
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
