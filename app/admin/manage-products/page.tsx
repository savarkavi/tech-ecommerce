import ProductsTable from "@/components/ProductsTable";
import React from "react";

const ManageProducts = async () => {
  return (
    <div className="flex items-center p-2">
      <ProductsTable />
    </div>
  );
};

export default ManageProducts;
