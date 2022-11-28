import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Frame = styled.div`
    display: grid;
    grid-template-rows: 65px auto;
    grid-template-areas:
        "nav"
        "main";
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
`;

type NavigationLayoutType = {
    bar: JSX.Element;
};
const NavigationLayout = ({ bar }: NavigationLayoutType) => {
    return (
        <Frame>
            {bar}
            <main>
                <Outlet />
            </main>
        </Frame>
    );
};

export default NavigationLayout;
export { Blog, Tests } from "./Authed";
