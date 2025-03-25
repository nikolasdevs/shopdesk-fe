import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardActions from "@/components/dashboard/DashboardActions";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="px-6 py-4 w-full max-w-7xl mx-auto flex flex-col main-h-svh ">
        <div className="space-y-8 w-full h-full">
          {/* Header/Navbar */}
          <DashboardHeader />

          {/* Main Section - Table */}
          <div className="space-y-0 w-full ">
            <div className="w-full flex justify-between max-[800px]:flex-col-reverse">
              {/* Tabs List/Component (Stock, Sales, Report) */}
              <div className="w-full flex">
                <Link href={"/dashboard"}>
                  <div className="flex items-center justify-center gap-2 border border-b-white py-2 rounded-tr-lg rounded-tl-lg w-44 max-[800px]:w-full font-semibold px-9 shadow-inner">
                    Stock
                    <Icons.Stock className="w-5 h-5" strokeColor="#009A49" />
                  </div>
                </Link>
                <Link href={"/dashboard/sales"}>
                  <div className="flex items-center justify-center gap-2 border border-b-white py-2 rounded-tr-lg rounded-tl-lg w-44 max-[800px]:w-full font-semibold px-9 shadow-inner">
                    Sales
                    <Icons.Sales className="w-5 h-5" strokeColor="#83838B" />
                  </div>
                </Link>
                <Link href={"/dashboard/reports"}>
                  <div className="flex items-center justify-center gap-2 border border-b-white py-2 rounded-tr-lg rounded-tl-lg w-44 max-[800px]:w-full font-semibold px-9 shadow-inner">
                    Reports
                    <Icons.Reports className="w-5 h-5" strokeColor="#83838B" />
                  </div>
                </Link>
              </div>

              {/* Add New Stock button and Search Component */}
              <DashboardActions />
            </div>
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-center mt-4">
            &copy; {new Date().getFullYear()}, Powered by Timbu Business
          </p>
        </div>
      </main>
    </>
  );
};

export default Layout;
