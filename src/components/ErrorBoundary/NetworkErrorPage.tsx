import React from "react";
import { RiArrowGoForwardLine } from "@react-icons/all-files/ri/RiArrowGoForwardLine";
import { Button } from "@App/styles";

const NetworkErrorPage = ({
    message = "Something went wrong. The network request failed.",
    retryAction,
}: {
    message: string;
    retryAction: React.MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <div className="font-Poppins flex flex-col items-center justify-center h-full gap-y-4 text-center">
            <h2 className="text-5xl font-bold">Network Error</h2>
            <p className="mt-4 text-xl text-center text-gray-700 max-w-[45ch] font-medium">
                {message}
            </p>
            <Button onClick={retryAction}>
                <span className="font-medium">Try Again</span>
                <RiArrowGoForwardLine />
            </Button>
        </div>
    );
};

export default NetworkErrorPage;
