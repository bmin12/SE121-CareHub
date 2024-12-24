import { Route, Routes } from "react-router-dom";
import {
  CategoryPage,
  CustomerPage,
  DashboardPage,
  InventoryPage,
  InvoicePage,
  Layout,
  ProductPage,
  PromotionPage,
  ProviderPage,
  RepairPage,
  ReportPage,
  StaffPage,
  WarrantyPage,
} from "./pages";

import LoginPage from "./pages/auth/LoginPage";
import UserProtect from "./pages/UserProtect";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyTokenPage from "./pages/auth/VerifyTokenPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import RolePage from "./pages/role/RolePage";
import { useEffect } from "react";
import {
  categoryService,
  customerService,
  permissionService,
  productService,
  promotionService,
  providerService,
} from "./services";
import {
  sCategory,
  sPermission,
  sProduct,
  sPromotion,
  sProvider,
  sRepair,
  sStaff,
  sUser,
  sWarranty,
} from "./store";
import reportService from "./services/report.service";
import sReport from "./store/reportStore";
import staffService from "./services/staff.service";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "./api/http";
import sCustomer from "./store/customerStore";
import warrantyService from "./services/warranty.service";
import repairService from "./services/repair.service";

function App() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token") || "";
  useEffect(() => {
    http.setAuthHeader(token);
    const fetchPermissions = async () => {
      try {
        const res = await permissionService.getAllPermissions();
        console.log(res);
        if (res.data.EC === 0) {
          sPermission.set((v) => (v.value.permissions = res.data.DT));
        } else {
          console.error("Failed to fetch permissions:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    const fetchGeneralReportByDate = async () => {
      const today = new Date().toISOString().split("T")[0];
      const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0];
      try {
        const res = await reportService.getReprotByDate(firstDayOfYear, today);
        if (res.data.EC === 0) {
          console.log("report data successfully", res.data.DT);
          sReport.set((prev) => (prev.value.reportByDate = res.data.DT));
        } else {
          console.error("Failed to fetch report by date:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching report by date:", error);
      }
    };
    const fetchStaffReportByDate = async () => {
      const today = new Date().toISOString().split("T")[0];
      const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0];
      try {
        const res = await reportService.getStaffReprotByDate(
          firstDayOfYear,
          today
        );
        if (res.data.EC === 0) {
          console.log("report data successfully", res.data.DT);
          sReport.set((prev) => (prev.value.staffReport = res.data.DT));
        } else {
          console.error("Failed to fetch staff report by date:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching staff report by date:", error);
      }
    };
    const fetchIncomeReportByDate = async () => {
      const today = new Date().toISOString().split("T")[0];
      const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0];
      try {
        const res = await reportService.getIncomeReprotByDate(
          firstDayOfYear,
          today
        );
        if (res.data.EC === 0) {
          console.log("report data successfully", res.data.DT);
          sReport.set((prev) => (prev.value.incomeReport = res.data.DT));
        } else {
          console.error("Failed to fetch income report by date:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching income report by date:", error);
      }
    };
    const fetchUserById = async () => {
      try {
        const id = localStorage.getItem("id") || sessionStorage.getItem("id");
        const res = await staffService.getStaffById(Number(id));
        if (res.data.EC === 0) {
          console.log("user data successfully", res.data.DT);
          sUser.set((v) => (v.value.info = res.data.DT));
        } else {
          console.error("Failed to fetch user:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    const fetchProducts = async () => {
      try {
        const res = await productService.getAllProducts();
        if (res.data.EC === 0) {
          sProduct.set((v) => (v.value.products = res.data.DT));
        } else {
          console.error("Failed to fetch products:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchProvider = async () => {
      try {
        const res = await providerService.getAllProviders();
        if (res.data.EC === 0) {
          sProvider.set((v) => (v.value.providers = res.data.DT));
        } else {
          console.error("Failed to fetch providers:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    const fetchCustomer = async () => {
      try {
        const res = await customerService.getAllCustomers();
        if (res.data.EC === 0) {
          sCustomer.set((v) => (v.value.customers = res.data.DT));
        } else {
          console.error("Failed to fetch customers:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    const fetchStaff = async () => {
      try {
        const res = await staffService.getAllStaffs();
        if (res.data.EC === 0) {
          sStaff.set((v) => (v.value.staffs = res.data.DT));
        } else {
          console.error("Failed to fetch staffs:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };
    const fetchPromotion = async () => {
      try {
        const res = await promotionService.getAllPromotions();
        if (res.data.EC === 0) {
          sPromotion.set((v) => (v.value.promotions = res.data.DT));
        } else {
          console.error("Failed to fetch promotions:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };
    const fetchWarranty = async () => {
      try {
        const res = await warrantyService.getAllWarrantyOrders();
        if (res.data.EC === 0) {
          sWarranty.set((v) => (v.value.warrantyOrders = res.data.DT));
        } else {
          console.error("Failed to fetch warranty orders:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching warranty orders:", error);
      }
    };
    const fetchRepair = async () => {
      try {
        const res = await repairService.getAllRepairOrders();
        if (res.data.EC === 0) {
          sRepair.set((v) => (v.value.repairs = res.data.DT));
        } else {
          console.error("Failed to fetch repair orders:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching repair orders:", error);
      }
    };
    const fetchCategory = async () => {
      try {
        const res = await categoryService.getAllCategory();
        if (res.data.EC === 0) {
          sCategory.set((v) => (v.value.categories = res.data.DT));
        } else {
          console.error("Failed to fetch categories:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    Promise.all([
      fetchPermissions(),
      fetchGeneralReportByDate(),
      fetchStaffReportByDate(),
      fetchIncomeReportByDate(),
      fetchUserById(),
      fetchProducts(),
      fetchProvider(),
      fetchCustomer(),
      fetchStaff(),
      fetchPromotion(),
      fetchWarranty(),
      fetchRepair(),
      fetchCategory(),
    ]);
  }, [token]);

  return (
    <>
      <ToastContainer
        style={{ zIndex: "1000" }}
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Flip}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-token" element={<VerifyTokenPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <UserProtect>
              <Layout />
            </UserProtect>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/provider" element={<ProviderPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/promotion" element={<PromotionPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/repair" element={<RepairPage />} />
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/role" element={<RolePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
