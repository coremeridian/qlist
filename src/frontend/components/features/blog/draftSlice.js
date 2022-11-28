import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    drafts: [
        {
            content: "null",
        },
    ],
};

const draftSlice = createSlice({
    name: "blogDraft",
    initialState: initialState,
    reducers: {
        mutateDraft: (state, action) => {
            const length = state.drafts.length;
            state.drafts[length - 1].content = action.payload;
        },
        pushDraft: (state, action) => {
            state.drafts.push(action.payload);
        },
        popDraft: () => {
            state.drafts.pop();
        },
    },
});

export const selectDraft = (state) => {
    const drafts = state.blogDraft.drafts;
    return drafts.length > 0 ? drafts[drafts.length - 1].content : "null";
};

export const selectIsDraftEmpty = (state) => {
    const drafts = state.blogDraft.drafts;
    return drafts.length == 0;
};

export const { mutateDraft, pushDraft, popDraft } = draftSlice.actions;

export default draftSlice.reducer;
