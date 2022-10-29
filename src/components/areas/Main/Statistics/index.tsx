import React from "react";
import styled from "styled-components";
import { Transition } from "@headlessui/react";
import {
    ReplaceTransition,
    TransitionGroup,
    CSSTransition,
} from "react-transition-group";
import { useUISelectionControl } from "@features/uistate/Context";
import TestSessionFeed from "@features/testsessions/Feed";
import CogFnRadial from "@features/users/statistics/CogFnRadial";
import FSIQRadar from "@features/users/statistics/FSIQRadar";

const Frame = styled.div`
    grid-area: stats;
    background-color: white;
    height: 100%;
`;

const TIMEOUT = 200;
const TransitionPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;

    .transition-enter {
        opacity: 0.01;
        transform: translate(0, -10px);
    }
    .transition-enter-active {
        opacity: 1;
        transform: translate(0, 0);
        transition: all ${TIMEOUT}ms ease-in;
        transition-delay: ${TIMEOUT / 2}ms;
        position: absolute;
    }
    .transition-exit {
        opacity: 1;
        transform: translate(0, 0);
    }
    .transition-exit-active {
        opacity: 0.01;
        transform: translate(0, 10px);
        transition: all ${TIMEOUT}ms ease-in;
    }
`;

const Statistics = () => {
    const id = "userAction";
    const { state } = useUISelectionControl();
    const hasState = state && state[id];
    const isActive = hasState && state[id].isActive;
    const firstNodeRef = React.useRef(null);
    const secondNodeRef = React.useRef(null);
    return (
        <Frame className="flex flex-col">
            {hasState && (
                <>
                    <Transition
                        show={isActive}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <ReplaceTransition
                            component={TransitionPanel}
                            in={state[id].selectedIndex == 0}
                        >
                            <CSSTransition
                                timeout={TIMEOUT}
                                nodeRef={firstNodeRef}
                                classNames="transition"
                            >
                                <TestSessionFeed ref={firstNodeRef} />
                            </CSSTransition>
                            <CSSTransition
                                timeout={TIMEOUT}
                                nodeRef={secondNodeRef}
                                classNames="transition"
                            >
                                <div
                                    ref={secondNodeRef}
                                    className="bg-red-200 h-80"
                                />
                            </CSSTransition>
                        </ReplaceTransition>
                    </Transition>
                    <TransitionGroup component={TransitionPanel}>
                        <CSSTransition
                            in={!isActive}
                            timeout={TIMEOUT}
                            classNames="transition"
                        >
                            <Frame>
                                <CogFnRadial className="p-10" />
                                <FSIQRadar className="p-10" />
                            </Frame>
                        </CSSTransition>
                    </TransitionGroup>
                </>
            )}
        </Frame>
    );
};

export default Statistics;
