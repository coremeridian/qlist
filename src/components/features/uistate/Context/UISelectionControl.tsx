import React, { useReducer, useEffect } from "react";

type Dispatch = (action: Action) => void;
type Action =
    | { type: "register"; id: string }
    | { type: "setSelectedIndex"; id: string; index: number }
    | { type: "setIsActive"; id: string; active: boolean };
type State =
    | {
        [key: string]: { isActive?: boolean; selectedIndex?: number };
    }
    | undefined;

function register(id: string): Action {
    return { type: "register", id };
}

function setSelectedIndex(id: string, index: number): Action {
    return { type: "setSelectedIndex", id, index };
}

function setIsActive(id: string, active: boolean): Action {
    return { type: "setIsActive", id, active };
}

function controlReducer(prevState: State, action: Action) {
    switch (action.type) {
        case "register":
            if (!prevState || (prevState && !prevState[action.id]))
                return {
                    ...prevState,
                    [action.id]: {
                        ...(prevState ? prevState[action.id] : {}),
                        isActive: false,
                        selectedIndex: 0,
                    },
                };
            return prevState;
        case "setSelectedIndex":
            return {
                ...prevState,
                [action.id]: {
                    ...(prevState ? prevState[action.id] : {}),
                    selectedIndex: action.index,
                },
            };
        case "setIsActive":
            return {
                ...prevState,
                [action.id]: {
                    ...(prevState ? prevState[action.id] : {}),
                    isActive: action.active,
                },
            };
    }
}

export const UISelectionControlContext = React.createContext<
    { state: State; dispatch: Dispatch } | undefined
>(undefined);

const getValidChildren = (children: React.ReactNode) =>
    React.Children.toArray(children).filter((child) =>
        React.isValidElement(child)
    ) as React.ReactElement[];

type RegisterIdentityType = {
    identity: string;
    dispatch?: Dispatch;
    children: React.ReactNode;
};
const Identity = (props: RegisterIdentityType) => {
    let dispatcher: Dispatch;
    if (props.dispatch) dispatcher = props.dispatch;
    else {
        const { dispatch } = useUISelectionControl();
        dispatcher = dispatch;
    }
    useEffect(() => {
        dispatcher(ControlActions.register(props.identity));
    }, []);
    return <>{props.children}</>;
};

const Group = ({ identity, children }: UISelectionControlProps) => {
    if (!identity)
        throw new Error("Group component must have an identity attribute");
    const { state, dispatch } = useUISelectionControl();
    const validChildren = React.useMemo(
        () => getValidChildren(children),
        [children]
    );

    useEffect(() => {
        console.log("UIState", state);
    });

    const handleSelection = (index: number) => () => {
        if (state && state[identity].selectedIndex == index) {
            dispatch(
                ControlActions.setIsActive(identity, !state[identity].isActive)
            );
        } else {
            dispatch(ControlActions.setSelectedIndex(identity, index));
        }
    };
    const wrappedChildren = React.Children.map(
        validChildren,
        (child, index) => (
            <button onClick={handleSelection(index)}>
                <div>{child}</div>
            </button>
        )
    );
    return <Identity identity={identity}>{wrappedChildren}</Identity>;
};

type UISelectionControlProps = {
    identity?: string;
    children: React.ReactNode;
};

const Control = (props: UISelectionControlProps) => {
    const [state, dispatch] = useReducer(controlReducer, {});

    return (
        <UISelectionControlContext.Provider
            value={{ state, dispatch }}
            {...props}
        />
    );
};

const getUISelectionControl = () => (props) => <Control {...props} />;

const useUISelectionControl = () => {
    const context = React.useContext(UISelectionControlContext);
    if (context === undefined)
        throw new Error(
            "useUISelectionControl must be used within UISelectionControl provider"
        );
    return context;
};

const UISelectionControl = Object.assign(Control, { Group, Identity });
const ControlActions = {
    register,
    setSelectedIndex,
    setIsActive,
};
export {
    UISelectionControl,
    getUISelectionControl,
    useUISelectionControl,
    ControlActions,
};
