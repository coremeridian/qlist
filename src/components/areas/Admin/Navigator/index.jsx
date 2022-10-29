import React from "react";
import NavOption from "./NavOption";
const Navigator = ({ categories }) => {
    return (
        <nav>
            <ul className="flex text-center border-b border-gray-200">
                {categories.map((category, index) => {
                    const className =
                        (index + 1) % 2 == 0
                            ? "flex-1 pl-px"
                            : index == categories.length - 1
                                ? "flex-1 -mr-px"
                                : "flex-1";
                    return (
                        <NavOption
                            className={className}
                            key={index}
                            title={category}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigator;
