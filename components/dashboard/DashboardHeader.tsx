"use client";
import React from "react";
import Logo from "@/components/functional/logo";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/store/useStore";

const DashboardHeader = () => {
  const { organizationName, organizationInitial } = useStore();

  return (
    <div className="lg:border px-4 py-2 lg:shadow-md rounded-lg lg:flex items-center justify-between mx-auto">
      <div className="flex items-center gap-6">
        <div className="flex justify-center lg:justify-start w-full lg:w-auto">
          <Logo />
        </div>
        <small className="text-black text-left hidden lg:block">
          The simplest way to manage your shop!
        </small>
      </div>
      <div className="">
        <DropdownMenu modal>
          <DropdownMenuTrigger
            disabled
            className="btn-primary hover:cursor-pointer hidden lg:flex items-center gap-2 text-white"
          >
            <span className="py-2 px-4 rounded-lg bg-white text-black">
              {organizationInitial}
            </span>
            {organizationName}
            <ChevronDown strokeWidth={1.5} color="white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="w-full px-[5rem]"
              // onClick={() => setIsLogoutModalOpen(true)}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
