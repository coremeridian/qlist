import React, { PropsWithChildren } from "react";
import { CustomElement, HeadingElement, CodeElement } from "./types";

type DefaultProps = PropsWithChildren<{
    attributes: any;
    element: CustomElement;
}>;

interface HeadingElementProps extends DefaultProps {
    element: HeadingElement;
}

interface CodeElementProps extends DefaultProps {
    element: CodeElement;
}

const DefaultElement = (props: DefaultProps) => {
    return <p {...props.attributes}>{props.children}</p>;
};

const Heading = (props: HeadingElementProps) => {
    switch (props.element.level) {
        case 2:
            return <h2 {...props.attributes}>{props.children}</h2>;
        default:
            return <h1 {...props.attributes}>{props.children}</h1>;
    }
};

const CodeBlock = (props: CodeElementProps) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};

export const Element = (props: DefaultProps) => {
    switch (props.element.type) {
        case "code":
            const codeProps = props as CodeElementProps;
            return <CodeBlock {...codeProps} />;
        case "heading":
            const headingProps = props as HeadingElementProps;
            return <Heading {...headingProps} />;
        default:
            return <DefaultElement {...props} />;
    }
};

interface LeafType extends DefaultProps {
    leaf: any;
}
export const Leaf = (props: LeafType) => {
    let style: Record<string, string> = {};
    if (props.leaf.bold) style["fontWeight"] = "bold";
    if (props.leaf.italic) style["fontStyle"] = "italic";
    if (props.leaf.underline) style["textDecoration"] = "underline";
    return (
        <span {...props.attributes} style={style}>
            {props.children}
        </span>
    );
};
