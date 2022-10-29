import React from "react";

const NoContentPage = () => (
    <div className="font-Poppins flex flex-col items-center justify-center h-full gap-y-4 text-center">
        <h2 className="text-5xl font-bold">No Content</h2>
        <p className="mt-4 text-xl text-center text-gray-700 max-w-[45ch] font-medium">
            Looks like we don't have any content available for this page at this
            time. If only we had some test creators....
        </p>
    </div>
);

export default NoContentPage;
