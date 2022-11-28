import React from "react";

const CartItem = () => {
    return (
        <div className="flex flex-row justify-center">
            <div className="basis-2/3 bg-green-200 h-full">
                <p>Title</p>
                <span>When Published</span>
                <span>Alotted time</span>
            </div>
            <div className="basis-1/3 bg-red-200 h-full">
                <span>price</span>
                <p>Attempt</p>
                <p>Action</p>
            </div>
        </div>
    );
};

export default CartItem;
