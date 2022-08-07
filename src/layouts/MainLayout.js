import React from "react";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <Stack>
      <MainHeader sx={{ minHeight: "100vh" }} />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
