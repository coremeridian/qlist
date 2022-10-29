import React from "react";
import { useSlate } from "slate-react";
import { Button, Icon } from "./styles";
import { Editor, Element, Transforms } from "slate";
import { FaBold } from "@react-icons/all-files/fa/FaBold";
import { FaItalic } from "@react-icons/all-files/fa/FaItalic";
import { FaUnderline } from "@react-icons/all-files/fa/FaUnderline";
import { FaCode } from "@react-icons/all-files/fa/FaCode";

const ListTypes = ["numbered-list", "bulleted-list"];
const TextAlignTypes = ["left", "center", "right", "justify"];

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return !!marks && marks[format] === true;
};

const isBlockActive = (editor, format, blockType = "type") => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (node) =>
                !Editor.isEditor(node) &&
                Element.isElement(node) &&
                node[blockType] === format,
        })
    );
    return !!match;
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) Editor.removeMark(editor, format);
    else Editor.addMark(editor, format, true);
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TextAlignTypes.includes(format) ? "align" : "type"
    );
    const isList = ListTypes.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (node) =>
            !Editor.isEditor(node) &&
            Element.isElement(node) &&
            ListTypes.includes(node.type) &&
            TextAlignTypes.includes(format),
        split: true,
    });
    let newProperties: Partial<Element>;
    if (TextAlignTypes.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        };
    } else {
        newProperties = {
            type: isActive ? "paragraph" : isList ? "list-item" : format,
        };
    }

    console.log(newProperties);

    Transforms.setNodes<Element>(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

export { isMarkActive, isBlockActive, toggleMark, toggleBlock };

const getFormatIcon = (format: string) => {
    let icon = <div />;
    if (format === "bold") icon = <FaBold />;
    if (format === "italic") icon = <FaItalic />;
    if (format === "underline") icon = <FaUnderline />;
    if (format === "code") icon = <FaCode />;
    return icon;
};

export const MarkButton = ({ format }: { format: string }) => {
    const editor = useSlate();
    let iconElement = getFormatIcon(format);
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon>{iconElement}</Icon>
        </Button>
    );
};

export const BlockButton = ({ format }: { format: string }) => {
    const editor = useSlate();
    let iconElement = getFormatIcon(format);
    return (
        <Button
            active={isBlockActive(
                editor,
                format,
                TextAlignTypes.includes(format) ? "align" : "type"
            )}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <Icon>{iconElement}</Icon>
        </Button>
    );
};
