import React from "react";
import tw from "tailwind-styled-components";

const ButtonFrame = tw.button`shadow-md py-3 px-6 rounded-lg transition duration-300`;

const LandingButton = tw(ButtonFrame)`
${(props) =>
    props.colored
        ? "bg-gray-400 text-white hover:bg-white hover:text-black"
        : "bg-white text-black hover:bg-gray-400 hover:text-white"}
`;

export { LandingButton, ButtonFrame };
