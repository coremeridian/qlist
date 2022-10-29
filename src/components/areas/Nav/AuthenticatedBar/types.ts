import React from "react";

export interface AuthenticatedNavProp {
    item: React.ReactNode;
}

type WithType = {
    icon: React.FunctionComponent;
};
export type WithMenuButtonType = WithType & {
    action: React.MouseEventHandler<HTMLButtonElement>;
};
export type WithMenuLinkType = WithType & {
    path: string;
};
