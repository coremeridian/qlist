import tw from "tailwind-styled-components";
import { Frame as OriginFrame } from "../styles";
import { Link } from "react-router-dom";

const Frame = tw(OriginFrame)`max-w-screen-2xl sm:px-6 lg:px-8`;

const StyledMenuLink = tw(Link)`block p-6 border-b-4 text-xl`;
const StyledMenuButton = tw.button`block p-6 text-xl`;
const StyledMenu = tw.div`block p-6 text-xl`;

export { Frame, StyledMenuLink, StyledMenu, StyledMenuButton };
