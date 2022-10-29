import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
    position: "relative",
    display: "block",
    padding: "1rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: "500",
    background: "white",
    boxShadow:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
};
const inactiveClassName =
    "block p-4 text-sm font-medium text-gray-500 bg-gray-100 ring-1 ring-inset ring-white";

const NavOption = ({ title, to }) => {
    const toPath = to ? to : title.toLowerCase();
    return (
        <li>
            <NavLink
                to={toPath}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={({ isActive }) =>
                    !isActive ? inactiveClassName : undefined
                }
            >
                {({ isActive }) =>
                    isActive ? (
                        <>
                            {title}
                            <span className="absolute inset-x-0 w-full h-px bg-white -bottom-px" />
                        </>
                    ) : (
                        <>{title}</>
                    )
                }
            </NavLink>
        </li>
    );
};

export default NavOption;
