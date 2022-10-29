import React from "react";
import { StyledMenuLink, StyledMenuButton } from "./styles";
import {
    AuthenticatedNavProp,
    WithMenuButtonType,
    WithMenuLinkType,
} from "./types";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";

export const withMenuButton =
    (
        NavBar: React.FunctionComponent<AuthenticatedNavProp>,
        buttonProps: WithMenuButtonType
    ) =>
        (props) =>
        (
            <NavBar
                {...props}
                item={
                    <StyledMenuButton onClick={buttonProps.action}>
                        <buttonProps.icon />
                    </StyledMenuButton>
                }
            />
        );

export const withMenuLink =
    (
        NavBar: React.FunctionComponent<AuthenticatedNavProp>,
        buttonProps: WithMenuLinkType
    ) =>
        (props) =>
        (
            <NavBar
                {...props}
                item={
                    <StyledMenuLink to={buttonProps.path}>
                        <buttonProps.icon />
                    </StyledMenuLink>
                }
            />
        );
