import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

type ElementType<T, R> = T & { children: R[] };
type Ascendant<T> = ElementType<T, Descendant>;

export type EditableVoidElement = ElementType<
    { type: "editable-void" },
    EmptyText
>;
export type MentionElement = ElementType<
    { type: "mention"; character: string },
    CustomText
>;

export type TableElement = ElementType<{ type: "table" }, TableRow>;
export type TableCellElement = ElementType<{ type: "table-cell" }, CustomText>;
export type TableRowElement = ElementType<{ type: "table-row" }, TableCell>;
export type TitleElement = ElementType<{ type: "title" }, Descendant>;

export type ButtonElement = Ascendant<{ type: "button" }>;
export type ListItemElement = Ascendant<{ type: "list-item" }>;

type SourceType<T, R> = ElementType<T, R> & { url: string };
export type VideoElement = SourceType<{ type: "video" }, EmptyText>;
export type ImageElement = SourceType<{ type: "image" }, EmptyText>;
export type LinkElement = SourceType<{ type: "link" }, CustomText>;

type Format<T> = Ascendant<T> & { align?: string };

export type ParagraphElement = Format<{ type: "paragraph" }>;
export type HeadingElement = Format<{ type: "heading"; level: number }>;
export type CodeElement = Format<{ type: "code" }>;
export type BulletedListElement = Format<{ type: "bulleted-list" }>;
export type BlockQuoteElement = Format<{ type: "block-quote" }>;

export type CheckListItemElement = {
    type: "checklist-item";
    checked: boolean;
    children: Descendant[];
};

export type CustomElement =
    | ParagraphElement
    | HeadingElement
    | CodeElement
    | BlockQuoteElement
    | BulletedListElement
    | CheckListItemElement
    | EditableVoidElement
    | ImageElement
    | LinkElement
    | ButtonElement
    | ListItemElement
    | MentionElement
    | TableElement
    | TableRowElement
    | TableCellElement
    | TitleElement
    | VideoElement;

export type FormattedText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    underline?: boolean;
};

export type EmptyText = {
    text: "";
};

export type CustomText = FormattedText;

declare module "slate" {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText | EmptyText;
    }
}
