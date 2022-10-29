import { combineReducers } from "redux";
import userReducer from "@features/users/userSlice";
import draftReducer from "@features/blog/draftSlice";
import { api } from "@features/api";

const rawReducers = {
    user: userReducer,
    blogDraft: draftReducer,
    [api.reducerPath]: api.reducer,
};

const rootReducer = combineReducers(rawReducers);
export { rootReducer as default, rawReducers };
