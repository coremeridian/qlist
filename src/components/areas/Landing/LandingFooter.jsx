import React from "react";
import { AiFillTwitterCircle } from "@react-icons/all-files/ai/AiFillTwitterCircle";
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub";

const LandingFooter = () => {
    return (
        <footer className="bg-primary-900 text-white">
            <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <h1 className="text-xl">CognitiveTesting</h1>
                        <div className="flex mt-4 space-x-4 text-gray-500 text-xl">
                            <AiFillTwitterCircle />
                            <AiFillGithub />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:flex lg:items-center lg:justify-end">
                        <nav>
                            <ul className="flex uppercase gap-12 text-xs">
                                <li className="cursor-pointer">Mission</li>
                                <li className="cursor-pointer">Features</li>
                                <li className="cursor-pointer">FAQ</li>
                                <li className="cursor-pointer">Login</li>
                                <li className="cursor-pointer">Register</li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="pt-8 mt-8 border-t border-gray-500 sm:items-center sm:justify-between sm:flex">
                    <div>
                        <p>support@cognitivetesting.org</p>
                        <p className="text-sm text-gray-500">
                            &copy; 2022 CognitiveTesting
                        </p>
                    </div>
                    <strong className="inline-flex items-center p-2 space-x-2 text-sm font-medium">
                        <span className="font-semibold">0000</span>
                        <span>Tests Taken</span>
                    </strong>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
