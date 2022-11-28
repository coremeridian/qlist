import React from "react";
import Navigator from "../Navigator";

const categories = ["Users", "Tests", "Blogs"];
const Header = () => {
    return (
        <header className="bg-gray-50">
            <div className="container flex flex-col gap-10 px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center sm:justify-between sm:gap-4">
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Admin Panel
                        </h1>
                        <p className="mt-1.5 text-sm text-gray-500">
                            Might add something interesting here
                        </p>
                    </div>
                    <button className="flex items-center transition rounded-lg group shrink-0 bg-white p-4 shadow-sm">
                        <span className="w-10 h-10 rounded-full bg-gray-200" />
                        <p className="hidden ml-2 text-xs text-left sm:block">
                            <strong className="block font-medium">
                                Admin Person
                            </strong>
                            <span className="text-gray-500">
                                adminperson@cognitivetesting.org
                            </span>
                        </p>
                    </button>
                </div>
                <Navigator categories={categories} />
            </div>
        </header>
    );
};

export default Header;
