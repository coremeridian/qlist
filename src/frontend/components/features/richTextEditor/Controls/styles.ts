import React, { Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { BaseProps } from "./types";

type OrNull<T> = T | null;

type ButtonProps = { active: boolean; reversed: boolean } & BaseProps;
export const Button = styled.span.attrs(
    (
        props: PropsWithChildren<ButtonProps>,
        ref: Ref<OrNull<HTMLSpanELement>>
    ) => ({ ...props, ref })
)`
    cursor: pointer;
    color: ${(props) =>
        props.reversed
            ? props.active
                ? "white"
                : "#aaa"
            : props.active
            ? "black"
            : "#ccc"};
`;

export const Icon = styled.span.attrs(
    (
        props: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLSpanElement>>
    ) => ({ ...props, ref })
)`
    font-size: 18px;
    vertical-align: text-bottom;
`;

export const Instruction = styled.div.attrs(
    (
        props: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLDivElement>>
    ) => ({ ...props, ref })
)`
    white-space: pre-wrap;
    margin: 0 -20px 10px;
    padding: 10px 20px;
    font-size: 14px;
    background: #f8f8e8;
`;

export const Menu = styled.div.attrs(
    (
        props: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLDivElement>>
    ) => ({ ...props, ref })
)`
    & > * {
        display: inline-block;
    }

    & > * + * {
        margin-left: 25px;
    }
`;

export const Toolbar = styled(Menu).attrs(
    (
        props: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLDivElement>>
    ) => ({ ...props, ref })
)`
    position: relative;
    padding: 1px 18px 17px;
    margin: 0 -10px;
    border-bottom: 2px solid #eee;
    margin-bottom: 20px;
`;
