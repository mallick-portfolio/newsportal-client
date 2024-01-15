import React from "react";
import ReduxProvider from "../store/ReduxProvider";
import DashboardSidebar from "../components/sidebar/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <ReduxProvider>
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="w-10/12 max-h-screen mt-2 overflow-y-scroll">{children}</div>
      </div>
    </ReduxProvider>
  );
};

export default DashboardLayout;
