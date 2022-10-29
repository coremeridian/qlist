import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavBar from "components/areas/Nav/PublicBar";
import LandingFooter from "../areas/Landing/LandingFooter";

export const PublicPage = () => (
    <div className="overflow-y-auto h-full">
        <PublicNavBar />
        <Outlet />
        <LandingFooter />
    </div>
);

export default PublicPage;
