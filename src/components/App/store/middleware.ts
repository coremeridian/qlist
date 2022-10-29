import {
    isRejected,
    isRejectedWithValue,
    Middleware,
    MiddlewareAPI,
} from "@reduxjs/toolkit";

export const rtkQueryErrorHandler: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            let msg = "";
            if (action.error?.message) {
                msg = action.error.message;
                if (action.payload?.status === 401) {
                    msg += ": Invalid Token - Please refresh your browser";
                }
            } else {
                msg = JSON.stringify(action.error);
            }
        } else if (isRejected(action)) {
            console.log(action.meta.condition);
        }
        return next(action);
    };
