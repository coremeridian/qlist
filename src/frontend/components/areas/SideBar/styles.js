import styled, { css } from "styled-components";
import tw from "tailwind-styled-components";
import { NavLink } from "react-router-dom";

const Frame = tw.div`flex flex-col items-center justify-between h-full bg-white shadow-md z-10`;

const Label = tw.span`absolute text-sx font-medium text-white bg-gray-900 left-full ml-4 px-2 py-1.5 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100`;

const navLinkCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    width: 100%;
    font-size: 1.25rem;
    line-height: 1.75rem;
    border-radius: 0.5rem;
    color: var(--primary-color-dark);
    filter: grayscale(60%) opacity(0.3);
    transition: 400ms ease;

    &.active {
        background: var(--primary-color-dark);
        color: white;
        ${(props) =>
        props.$mode === "logout"
            ? "filter: grayscale(40%) opacity(1)"
            : "filter: grayscale(0%) opacity(1)"}
    }
`;

const StyledNavLink = styled(NavLink).attrs((props) => ({ to: props.$to }))(
    (props) => {
        switch (props.$mode) {
            case "logout":
                return (
                    navLinkCss +
                    css`
                        color: green;
                        margintop: auto;
                    `
                );
            default:
                return navLinkCss;
        }
    }
);

const FooterFrame = tw.div`sticky inset-x-0 p-2 bg-white border-t border-gray-100`;

const LogoutButton = tw.button`flex justify-center w-full px-2 py-1.5 mb-10 text-xl text-gray-500 rounded-lg hover:bg-gray-200 hover:text-white relative`;

export { Frame, Label, StyledNavLink, FooterFrame, LogoutButton };
