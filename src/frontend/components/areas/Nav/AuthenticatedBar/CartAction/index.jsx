import React from "react";
import { BsBag } from "@react-icons/all-files/bs/BsBag";
import { PopoverFrame } from "@features/uistate/ActionFrame";
import CartItem from "./CartItem";

const CartAction = () => {
    return (
        <PopoverFrame buttonIcon={<BsBag />}>
            <div className="mt-3 w-screen max-w-sm transform sm:px lg:max-w-3xl">
                <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="flex flex-col gap-8 p-7 bg-white">
                        <CartItem />
                    </div>
                </div>
            </div>
        </PopoverFrame>
    );
};

export default CartAction;
