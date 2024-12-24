import ImportPopup from "../../components/inventoryPage/ImportPopup";
import ImportHistoryOrderPopup from "../../components/inventoryPage/ImportHistoryOrderPopup";
import { useEffect, useState } from "react";
import StockTable from "../../components/inventoryPage/StockTable";
import { Product } from "../../entities";
import { Button } from "@mui/material";
import { productService } from "../../services";
import { sProduct } from "../../store";
export default function InventoryPage() {
  const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
  const [isPopupImportHistoryOrder, setIsPopupImportHistoryOrder] =
    useState(false);
  const products = sProduct.use((v) => v.products);
  return (
    <div className="container bg-white h-full">
      <div className="header w-full flex gap-4 p-4 pl-8">
        <Button
          variant="contained"
          onClick={() => setIsImportPopupOpen(true)}
          style={{
            textTransform: "none",
          }}
          id="openImportPopupButton"
        >
          Import goods
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            console.log("importHistoryOrder");
            setIsPopupImportHistoryOrder(true);
          }}
          style={{
            textTransform: "none",
          }}
          id="openImportHistoryOrderPopupButton"
        >
          Import history order
        </Button>
      </div>
      <div className="table-container w-full px-8 py-4">
        <StockTable products={products} />
      </div>

      {isImportPopupOpen && (
        <ImportPopup onClose={() => setIsImportPopupOpen(false)} />
      )}
      {isPopupImportHistoryOrder && (
        <ImportHistoryOrderPopup
          onClose={() => setIsPopupImportHistoryOrder(false)}
        />
      )}
    </div>
  );
}
