import React, { useEffect } from "react";
import { extractUserPayload } from "@features/authentication";
import { userProfileLoaded } from "@features/users/userSlice";
import { useAppDispatch } from "@App/store";
import { useAuth } from "react-oidc-context";

const AuthLayer = ({ children }) => {
    const auth = useAuth();
    const dispatch = useAppDispatch();
    useEffect(() => {
        return auth.events.addAccessTokenExpiring(() => {
            if (
                alert(
                    "You're about to be signed out due to inactivity. Press continue to stay signed in."
                )
            ) {
                auth.signinSilent();
            }
        });
    }, [auth.events, auth.signinSilent]);
    useEffect(() => {
        return auth.events.addUserLoaded((user) => {
            const data = extractUserPayload(user.access_token);
            dispatch(userProfileLoaded(data));
        });
    }, [auth.events]);
    return <>{children}</>;
};

export default AuthLayer;
