import React from "react";
import TestCard from "./TestCard";
import TestFeedSkeleton from "./TestFeedSkeleton";
import { Grid } from "./styles";
import { useGetTestsQuery } from "../api";
import { Transition } from "@headlessui/react";
import {
    useUISelectionControl,
    UISelectionControl,
} from "@features/uistate/Context";
import NetworkErrorPage from "components/ErrorBoundary/NetworkErrorPage";
import NoContentPage from "components/ErrorBoundary/NoContentPage";
import styled from "styled-components";

interface TestFeedTypeProp {
    type: string;
}

const Frame = styled.div`
    grid-area: "tests";
    background-color: white;
    padding: var(--grid-gap);
    border-radius: 0.2rem;
`;

export const TestFeedWithSelectionContext = () => {
    const id = "tests";
    const { state } = useUISelectionControl();
    return (
        <UISelectionControl.Identity identity={"tests"}>
            <Frame>
                <Transition
                    show={
                        state && state[id]
                            ? state[id].selectedIndex == 0
                            : false
                    }
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <TestFeed type={"general"} />
                </Transition>
            </Frame>
        </UISelectionControl.Identity>
    );
};

const TestFeed = (props: TestFeedTypeProp) => {
    const testType = props.type;
    const { data: tests, isLoading, error, refetch } = useGetTestsQuery();

    let content;

    if (isLoading) {
        content = <TestFeedSkeleton />;
    } else if (tests) {
        content = (
            <Grid>
                {tests.ids.map((id, index) => (
                    <TestCard key={index} id={id} />
                ))}
            </Grid>
        );
    } else if (error) {
        if ("status" in error) {
            content = <NetworkErrorPage onClick={refetch} />;
        } else {
            content = <div>{error.message}</div>;
        }
    } else {
        content = <NoContentPage />;
    }
    return <>{content}</>;
};

export default TestFeed;
