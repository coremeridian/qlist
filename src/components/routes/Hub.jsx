import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../areas/SideBar";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BuildProviderTree } from "@App/helpers";
import {
    getUISelectionControl,
    getPageIdentifier,
} from "@features/uistate/Context";

const OriginFrame = styled.div`
    display: grid;
    grid-template-columns: 5rem auto;
    grid-template-areas: "sidebar main";
    max-width: 1536px;
    height: 100vh;
`;
const Frame = tw(OriginFrame)`mx-auto shadow-md`;

const Hub = () => {
    const UIControlStateProvider = BuildProviderTree([
        getPageIdentifier("hub"),
        getUISelectionControl("tests"),
        getUISelectionControl("userAction"),
    ]);
    return (
        <HelmetProvider>
            <Helmet prioritizeSeoTags>
                <title>Hub</title>
                <link rel="canonical" href="https://qlist.coremeridian.xyz" />
                <meta name="og:title" content="A CognitiveTesting production" />
            </Helmet>
            <UIControlStateProvider>
                <Frame>
                    <SideBar gridName="sidebar" />
                    <main className="bg-slate-100 overflow-y-auto">
                        <Outlet />
                    </main>
                </Frame>
            </UIControlStateProvider>
        </HelmetProvider>
    );
};

export default Hub;
