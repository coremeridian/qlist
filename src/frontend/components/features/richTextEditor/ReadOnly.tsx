import React, { useMemo, useCallback } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import { Element, Leaf } from "@features/richTextEditor/renderers";

const ReadOnlyEditor = ({ content }: { content: Descendant[] }) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    return (
        <Slate editor={editor} value={content}>
            <Editable
                readOnly
                renderElement={renderElement}
                renderLeaf={renderLeaf}
            />
        </Slate>
    );
};

export default ReadOnlyEditor;
