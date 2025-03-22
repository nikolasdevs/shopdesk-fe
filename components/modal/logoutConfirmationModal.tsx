<<<<<<< HEAD
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LogOut } from 'lucide-react';
import LogoutButton from '@/app/(auth)/sign-in/_components/logout';

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
      <DialogContent className='max-w-md rounded-xl p-0 overflow-hidden border border-gray-200'>
        <div className='pt-8 pb-4 flex flex-col items-center'>
          <div className='h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-4'>
            <LogOut className='h-8 w-8 text-red-500' />
          </div>
          <DialogHeader className='text-center'>
            <DialogTitle className='text-2xl font-semibold'>Logout</DialogTitle>
          </DialogHeader>
          <div className='text-center px-8 text-gray-600 mt-2'>
            Are you sure you want to log out of your account? You will need to
            sign in again to access your data.
          </div>
        </div>
        <div className='border-t border-gray-200' />
        <DialogFooter className='flex p-4 gap-4'>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='flex-1 py-6 rounded-md border-gray-200 hover:bg-gray-50 hover:text-gray-900'
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
=======
"use client";


import * as React from "react";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth";


interface LogoutConfirmModalProps {
 open: boolean;
 onOpenChange: (open: boolean) => void;
 onCancel: () => void;
 organizationName?: string;
}


const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
 open,
 onOpenChange,
 onCancel,
 organizationName,
}) => {
 const router = useRouter();
 const [loading, setLoading] = React.useState(false);


 const handleLogout = async () => {
   setLoading(true);
   try {
     await logoutUser();
     router.push("/");
   } catch (error) {
     console.error("Logout failed:", error);
   } finally {
     setLoading(false);
   }
 };


 return (
   <Dialog open={open} onOpenChange={onOpenChange}>
     <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden border border-gray-200 space-y-4">
       <div className="relative">
         <div className="pt-8 pb-4 flex flex-col items-center">
           <div className="h-16 w-16 rounded-full bg-[#FEF6F6] flex items-center justify-center mb-4">
             <LogOut className="h-8 w-8 text-[#414141]" />
           </div>


           <DialogHeader className="text-center">
             <DialogTitle className="text-2xl font-semibold font-circular-bold">
               Log out of Shopdesk
             </DialogTitle>
           </DialogHeader>


           <div className="text-center px-8 text-[#717171] font-circular-light mt-2">
             Are you sure you want to log out of Shopdesk as{" "}
             <span>{organizationName}</span>? You can always log in when you want to.
           </div>
         </div>


         <div className="border-t border-gray-200"></div>


         <DialogFooter className="flex flex-row p-4 gap-4">
           <Button
             variant="outline"
             onClick={onCancel}
             className="flex-1 py-6 rounded-md border-[#1B1B1B] text-[#1B1B1B]"
           >
             Cancel
           </Button>
           <Button
             onClick={handleLogout}
             className="flex-2 py-6 rounded-md bg-[#414141] text-white"
           >
             {loading ? "Logging out..." : "Logout"}
           </Button>
         </DialogFooter>
       </div>
     </DialogContent>
   </Dialog>
)
};


export default LogoutConfirmModal;
>>>>>>> upstream/main
