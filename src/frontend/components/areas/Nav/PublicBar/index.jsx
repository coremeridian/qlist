import React from "react";
import { FiMenu } from "react-icons/fi";
import AuthPortal from "@features/authentication/AuthPortal";
import logo from "./logo.png";

const PublicNavBar = () => {
    return (
        <header className="shadow-sm">
            <div className="container p-4 mt-4 mx-auto">
                <div className="flex items-center justify-between space-x-4 lg:space-x-10">
                    <div className="flex lg:w-0 lg:flex-1">
                        <img className="w-60 h-1/2" src={logo} />
                    </div>
                    <nav className="hidden ml-8 space-x-8 text-sx font-medium md:flex">
                        <span>Mission</span>
                        <span>Features</span>
                        <span>FAQ</span>
                        <span>Contact</span>
                    </nav>
                    <div className="items-center justify-end flex-initial hidden space-x-4 sm:flex">
                        <AuthPortal />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PublicNavBar;
