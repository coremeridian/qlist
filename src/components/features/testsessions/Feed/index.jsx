import React from "react";
import SessionItem from "./SessionItem";

const TestSessionFeed = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="flex flex-col p-6 divide-y">
            <SessionItem />
            <SessionItem />
            <SessionItem />
        </div>
    );
});

export default TestSessionFeed;
