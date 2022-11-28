import React, { useState, Fragment } from "react";
import { HiOutlineNewspaper } from "@react-icons/all-files/hi/HiOutlineNewspaper";
import { GoHome } from "@react-icons/all-files/go/GoHome";
import { GrGroup } from "@react-icons/all-files/gr/GrGroup";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { RiAdminLine } from "@react-icons/all-files/ri/RiAdminLine";
import { Frame, StyledNavLink, FooterFrame, LogoutButton } from "./styles";
import { AuthPortal } from "@features/authentication";
import { Dialog, Transition } from "@headlessui/react";

const Logo = () => {
    return (
        <div className="inline-flex items-center justify-center w-16 h-16">
            <span className="block w-10 h-10 bg-gray-200 rounded-lg"></span>
        </div>
    );
};

const NavMenu = () => {
    const menuItems = [
        { path: "administration", icon: <RiAdminLine /> },
        { path: "tests", icon: <GoHome /> },
        { path: "blog", icon: <HiOutlineNewspaper /> },
    ];
    return (
        <nav className="flex flex-col">
            <div className="py-4">
                <StyledNavLink $to="/team">
                    <GrGroup />
                </StyledNavLink>
            </div>
            <ul className="flex flex-col pt-4 space-y-1 border-t border-gray-100">
                {menuItems.map((item, index) => (
                    <li key={index} className="group">
                        <StyledNavLink
                            key={index}
                            $to={item.path}
                            $mode={item.path}
                            className="flex flex-col bg-white ease-in transition-all duration-200 group-hover:bg-gray-200 group-hover:scale-110 group-hover:gap-y-1 hover:my-4"
                        >
                            {item.icon}
                            <span className="hidden group-hover:text-sm group-hover:inline transition-all duration-200 text-clip overflow-hidden">
                                {item.path}
                            </span>
                        </StyledNavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <Frame>
            <div>
                <Logo />
                <div className="border-t border-gray-100">
                    <NavMenu />
                </div>
            </div>
            <FooterFrame>
                <LogoutButton onClick={openModal}>
                    <FiLogOut />
                </LogoutButton>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h2"
                                            className="text-lg font-medium leading-6 text-gray-900 text-center"
                                        >
                                            Logging Out
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                You are about to log out. Is
                                                this the desired action?
                                            </p>
                                        </div>

                                        <div className="flex justify-evenly mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </button>
                                            <AuthPortal />
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </FooterFrame>
        </Frame>
    );
};

export default SideBar;
