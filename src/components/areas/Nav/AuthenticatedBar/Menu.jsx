import React from "react";
import { StyledMenuLink, StyledMenuButton } from "./styles";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { BsBag } from "@react-icons/all-files/bs/BsBag";

const Menu = () => {
    return (
        <div className="flex items-center justify-end flex-1">
            <div className="flex items-center ml-8">
                <div className="flex items-center border-gray-100 divide-x divide-gray-100 border-x">
                    <span>
                        <StyledMenuLink to="/checkout">
                            <BsBag />
                        </StyledMenuLink>
                    </span>
                    <span>
                        <StyledMenuButton>
                            <AiOutlineUser />
                        </StyledMenuButton>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Menu;
