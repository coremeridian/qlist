import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    id: "",
    preferred_username: "",
    given_name: "",
    family_name: "",
    email: "",
    email_verified: false,
    scope: [],
    roles: [],
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        userProfileLoaded: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (_) => initialState);
    },
});

export const selectId = (state) => state.user.id;
export const selectUsername = (state) => state.user.preferred_username;
export const selectFirstName = (state) => state.user.given_name;
export const selectLastName = (state) => state.user.family_name;
export const selectEmail = (state) => state.user.email;
export const selectIsEmailVerified = (state) => state.user.email_verified;
export const selectRoles = (state) => state.user.roles;
export const selectScope = (state) => state.user.scope;

export const { userProfileLoaded } = userSlice.actions;
export default userSlice.reducer;
