import React, { useState } from "react";
import { Frame, StyledMenu } from "./styles";
import CartAction from "./CartAction";
import UserConfigAction from "./UserConfigAction";
import TagSelector from "../TagSelector";
import SearchBar from "../SearchBar";
import { AuthenticatedNavProp } from "./types";
import { BsBag } from "@react-icons/all-files/bs/BsBag";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import {
    UISelectionControl,
    usePageIdentifier,
} from "@features/uistate/Context";

const AuthenticatedNavBar = ({ item }: AuthenticatedNavProp) => {
    return (
        <header className="border-b border-gray-100 bg-white">
            <Frame>
                <TagSelector />
                <SearchBar />
                <div className="flex items-center justify-end flex-1">
                    <div className="flex items-center ml-8">
                        <div className="flex items-center border-gray-100 divide-x divide-gray-100 border-x">
                            <span>{item}</span>
                            <UserManagementOptions />
                        </div>
                    </div>
                </div>
            </Frame>
        </header>
    );
};

const UserManagementOptions = () => {
    const { isMainPage } = usePageIdentifier();
    return (
        <div className="flex flex-row items-center divide-x divide-gray-100">
            {(isMainPage && (
                <UISelectionControl.Group identity={"userAction"}>
                    <StyledMenu>
                        <BsBag />
                    </StyledMenu>
                    <StyledMenu>
                        <AiOutlineUser />
                    </StyledMenu>
                </UISelectionControl.Group>
            )) || (
                    <>
                        <CartAction />
                        <UserConfigAction />
                    </>
                )}
        </div>
    );
};

export default AuthenticatedNavBar;
