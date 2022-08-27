import * as React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

const Layout = () => {
  return (
    <>
    <Box sx={{ display: "flex" }}>
      <DashboardHeader />
      <Outlet />
      
    </Box>
    <DashboardFooter />
    </>
  );
};
export default Layout;
