import React from "react";
import { useSearchParams } from "react-router-dom";

export const Checkout = () => {
    const [searchParams] = useSearchParams();
    return (
        <div>
            <span>Something in the way</span>
            <a href={searchParams.get("session_id") || ""}>Session!</a>
        </div>
    );
};
