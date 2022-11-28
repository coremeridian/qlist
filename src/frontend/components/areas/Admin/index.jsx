import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const AdminPanel = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AdminPanel;
