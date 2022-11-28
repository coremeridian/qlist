import React from "react";
import { TestFeedWithSelectionContext } from "@features/tests/Feed";
import Statistics from "./Statistics";
import styled from "styled-components";
import "./style.css";

const Frame = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    grid-template-rows: 1fr;
    grid-template-areas: "tests stats";
    column-gap: var(--grid-gap);
    row-gap: var(--grid-gap);
    overflow-y: auto;
    height: 100%;
`;
const Main = () => {
    return (
        <Frame className="p-4">
            <TestFeedWithSelectionContext />
            <aside>
                <Statistics />
            </aside>
        </Frame>
    );
};

export default Main;
