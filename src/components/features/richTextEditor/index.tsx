import React, { useMemo, useState, useCallback, useEffect } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Element, Leaf } from "./renderers";
import { ParagraphElement } from "./types";
import { MarkButton, BlockButton } from "./Controls";
import { Toolbar } from "./Controls/styles";
import { toggleMark } from "./Controls";
import isHotkey from "is-hotkey";
import { useAppDispatch, useAppSelector } from "@App/store";
import { selectDraft, mutateDraft } from "@features/blog/draftSlice";
import { useController } from "react-hook-form";
import { pushDraft, selectIsDraftEmpty } from "@features/blog/draftSlice";

const HotKeys = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
};

type RichTextEditorProp = {
    control: any;
    name: string;
    inputBody?: string;
};

const RichTextEditor = ({ control, name, inputBody }: RichTextEditorProp) => {
    const {
        field: { onChange, onBlur, ref },
    } = useController({ name, control, rules: { required: true } });
    const savedDraft = useAppSelector(selectDraft);
    const dispatch = useAppDispatch();
    const initialValue = useMemo(
        () =>
            JSON.parse(savedDraft) || [
                {
                    type: "paragraph",
                    children: [{ text: "" }],
                },
            ],
        []
    );
    const [value, setValue] = useState<Descendant[]>(initialValue);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    useEffect(() => {
        if (inputBody) {
            const savedParagraph = {
                children: [{ text: inputBody }],
            } as ParagraphElement;
            setValue([savedParagraph]);
        }
    }, []);

    const hasEmptyDraft = useAppSelector(selectIsDraftEmpty);
    const onChangeEditorValue = (val: Descendant[]) => {
        setValue(val);
        const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
            const content = JSON.stringify(val);
            onChange(content);
            if (hasEmptyDraft) dispatch(pushDraft(content));
            else dispatch(mutateDraft(content));
        }
    };

    return (
        <Slate editor={editor} value={value} onChange={onChangeEditorValue}>
            <Toolbar>
                <MarkButton format="bold" />
                <MarkButton format="italic" />
                <MarkButton format="underline" />
                <BlockButton format="code" />
            </Toolbar>
            <Editable
                spellCheck
                autoFocus
                onBlur={onBlur}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => {
                    for (const hotkey in HotKeys) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault();
                            const mark = HotKeys[hotkey];
                            toggleMark(editor, mark);
                        }
                    }
                }}
            />
        </Slate>
    );
};

export default RichTextEditor;
