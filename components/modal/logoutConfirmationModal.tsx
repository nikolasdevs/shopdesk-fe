"use client";

import LogoutButton from "@/app/(auth)/sign-in/_components/logout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import * as React from "react";

interface LogoutModalProps {
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerElement?: React.ReactNode;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  open,
  onOpenChange,
  triggerElement,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerElement && (
        <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      )}
      <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden border border-gray-200">
        <div className="pt-8 pb-4 flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <LogOut className="h-8 w-8 text-red-500" />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-semibold">Logout</DialogTitle>
          </DialogHeader>
          <div className="text-center px-8 text-gray-600 mt-2">
            Are you sure you want to log out of your account? You will need to
            sign in again to access your data.
          </div>
        </div>
        <div className="border-t border-gray-200" />
        <DialogFooter className="flex p-4 gap-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1 py-6 rounded-md border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            >
              Cancel
            </Button>
          </DialogClose>
          <LogoutButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
