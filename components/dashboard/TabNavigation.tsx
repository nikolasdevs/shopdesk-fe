"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/ui/icons";

const TabNavigation = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);

  const tabs = [
    {
      name: "Stock",
      path: "/dashboard",
      icon: (
        <Icons.Stock
          className="w-5 h-5"
          strokeColor={pathname === "/dashboard" ? "#009A49" : "#83838B"}
        />
      ),
    },
    {
      name: "Sales",
      path: "/dashboard/sales",
      icon: (
        <Icons.Sales
          className="w-5 h-5"
          strokeColor={pathname === "/dashboard/sales" ? "#009A49" : "#83838B"}
        />
      ),
    },
    {
      name: "Reports",
      path: "/dashboard/reports",
      icon: (
        <Icons.Reports
          className="w-5 h-5"
          strokeColor={
            pathname === "/dashboard/reports" ? "#009A49" : "#83838B"
          }
        />
      ),
    },
  ];

  return (
    <div className="w-full flex border border-b-0 max-w-fit rounded-t-lg overflow-hidden bg-[#F6F8FA] p-1 pb-0">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        console.log("isActive", isActive, tab);

        return (
          <Link key={tab.name} href={tab.path}>
            <div
              className={`flex items-center justify-center gap-2 py-2 w-44 max-[800px]:w-full font-semibold px-9 ${
                isActive ? "bg-white rounded-t-lg" : ""
              }`}
            >
              <span className={isActive ? "text-[#2A2A2A]" : "text-[#83838b]"}>
                {tab.name}
              </span>
              {tab.icon}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TabNavigation;
