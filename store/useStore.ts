import { StockItem } from "@/app/(dashboard)/dashboard/page";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SalesItem {
  sale_id: string;
  product_id?: string;
  product_name: string;
  quantity_sold: number;
  price_per_unit: number;
  total_amount: number;
  sale_date: string;
}

interface StoreState {
  // Organization info
  organizationId: string;
  organizationName: string;
  organizationInitial: string;

  // Stock management
  stockItems: StockItem[];
  isPremium: boolean;
  isSearching: boolean;
  searchText: string;

  // Sales management
  salesItems: SalesItem[];

  // Actions
  setOrganizationId: (organizationId: string) => void;
  setOrganizationName: (organizationName: string) => void;
  setOrganizationInitial: (organizationInitial: string) => void;
  setStockItems: (
    items: StockItem[] | ((prev: StockItem[]) => StockItem[])
  ) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSearchText: (text: string) => void;
  setSalesItems: (
    items: SalesItem[] | ((prev: SalesItem[]) => SalesItem[])
  ) => void;
  addSale: (sale: SalesItem) => void;
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      organizationId: "",
      organizationName: "",
      organizationInitial: "",
      stockItems: [],
      isPremium: false,
      isSearching: false,
      searchText: "",
      salesItems: [],

      // Actions
      setOrganizationId: (organizationId) => set({ organizationId }),
      setOrganizationName: (organizationName) =>
        set({
          organizationName,
          organizationInitial: getInitials(organizationName),
        }),
      setOrganizationInitial: (organizationInitial) =>
        set({ organizationInitial }),
      setStockItems: (items) =>
        set((state) => ({
          stockItems:
            typeof items === "function" ? items(state.stockItems) : items,
        })),
      setIsSearching: (isSearching) => set({ isSearching }),
      setSearchText: (searchText) => set({ searchText }),
      setSalesItems: (items) =>
        set((state) => ({
          salesItems:
            typeof items === "function" ? items(state.salesItems) : items,
        })),
      addSale: (sale) =>
        set((state) => ({
          salesItems: [sale, ...state.salesItems],
          // Optionally update stock quantities here
          stockItems: state.stockItems.map((item) =>
            item.product_id === sale.product_id
              ? { ...item, quantity: item.quantity - sale.quantity_sold }
              : item
          ),
        })),
    }),
    {
      name: "shopdesk-store",
    }
  )
);
