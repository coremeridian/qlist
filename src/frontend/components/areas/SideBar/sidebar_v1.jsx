import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import styled, { css } from "styled-components";
import tw from "tailwind-styled-components";

const Bar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 3px hsl(224, 11%);
    position: relative;
    z-index: 5;
    ${(props) => `grid-area: ${props.$gridName}`}
`;

const Logo = tw.div`flex w-full font-semibold text-sm h-16 items-center justify-center text-blue-400 first-letter:font-bold first-letter:text-lg`;
const TeamSection = tw.div`grow: 1`;

const navLinkCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    width: 100%;
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
                        color: white;
                        margintop: auto;
                    `
                );
            default:
                return navLinkCss;
        }
    }
);

const Menu = styled.div`
    display: flex;
    flex-grow: 2;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
`;

const SideBar = ({ gridName }) => {
    const menuItemList = [
        { path: "/tests", icon: <span>Home</span> },
        { path: "blog", icon: <span>Blog</span> },
        { path: "logout", icon: <span>Logout</span> },
    ];
    return (
        <Bar $gridName={gridName}>
            <Logo>
                <p>Qlist</p>
            </Logo>
            <TeamSection />
            <Menu>
                {menuItemList.map((item, index) => (
                    <StyledNavLink
                        key={index}
                        $to={item.path}
                        $mode={item.path}
                    >
                        {item.icon}
                    </StyledNavLink>
                ))}
            </Menu>
        </Bar>
    );
};

export default SideBar;
