"use client";
import React from "react";
import SalesTab from "@/components/functional/salestab";
import { useStore } from "@/store/useStore";

const SalesPage = () => {
  const { salesItems, stockItems, addSale } = useStore();

  return (
    <React.Fragment>
      <SalesTab
        onAddSale={addSale}
        salesItems={salesItems}
        stockItems={stockItems}
      />
    </React.Fragment>
  );
};

export default SalesPage;
