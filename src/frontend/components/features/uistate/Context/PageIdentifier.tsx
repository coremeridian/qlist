import React, { useReducer, useMemo, useEffect, useContext } from "react";

type Dispatch = (action: Action) => void;
type PageChange = { type: "setCurrentPage" | "setMainPage"; id: string };
type Action = PageChange | { type: "setIsMainPage"; isValue: boolean };
type State = {
    currentPage: string;
    mainPage: string;
    isMainPage: boolean;
};

const PageIdentifierContext = React.createContext<
    { state: State; dispatch: Dispatch } | undefined
>(undefined);

export type PageIdentifierType = ReturnType<typeof getPageIdentifier>;

function setPage(page: string, main: boolean): PageChange {
    return { type: main ? "setMainPage" : "setCurrentPage", id: page };
}

function setIsMainPage(isMain: boolean) {
    return { type: "setIsMainPage", isValue: isMain };
}

function pageStateReducer(prevState: State, action: Action) {
    switch (action.type) {
        case "setCurrentPage":
            return { ...prevState, currentPage: action.id };
        case "setMainPage":
            return { ...prevState, mainPage: action.id };
        case "setIsMainPage":
            return { ...prevState, isMainPage: action.isValue };
    }
}

const Identifier = (props) => {
    const [state, dispatch] = useReducer(pageStateReducer, {
        currentPage: props.startPage,
        mainPage: props.startPage,
        isMainPage: true,
    });
    const value = useMemo(
        () => ({
            state,
            dispatch,
            ...props.value,
        }),
        [state, dispatch, props.value]
    );
    return <PageIdentifierContext.Provider value={value} {...props} />;
};
const getPageIdentifier = (startPage: string) => (props) =>
    <Identifier startPage={startPage} {...props} />;

const Page = ({ id, children }) => {
    const { dispatch, action } = usePageIdentifier();
    useEffect(() => {
        dispatch(action.setPage(id, false));
    }, []);
    return <>{children}</>;
};

type PageIdentifierConfig = {
    inPage?: string;
};
const usePageIdentifier = (config?: PageIdentifierConfig) => {
    const context = useContext(PageIdentifierContext);
    if (context === undefined)
        throw new Error(
            "usePageIdentifier must be used within PageIdentifier provider"
        );
    useEffect(() => {
        if (config?.inPage) setPage(config?.inPage, false);
        setIsMainPage(context.state.currentPage === context.state.mainPage);
    }, [config?.inPage, context.state.currentPage, context.state.mainPage]);
    return (({ currentPage, mainPage, isMainPage }) => ({
        currentPage,
        mainPage,
        isMainPage,
        dispatch: context.dispatch,
        action: {
            setPage,
            setIsMainPage,
        },
    }))(context.state);
};

const PageIdentifier = Object.assign(Identifier, { Page });
export { PageIdentifier, getPageIdentifier, usePageIdentifier };
