import React from "react";
import { useAuth } from "react-oidc-context";
import tw from "tailwind-styled-components";

/*
   TODO: fix the persisting auth after logout
   probably has something to do with useCallback
   maybe needs to be changed with redux.
 */

const AuthButton = tw.button`bg-primary-900 text-white font-semibold text-sm rounded-lg px-7 py-3 uppercase`;

const AuthPortal = () => {
    const auth = useAuth();
    if (auth.isLoading) return <AuthButton>Loading</AuthButton>;
    if (auth.isAuthenticated) {
        return (
            <AuthButton onClick={() => void auth.removeUser()}>
                Logout
            </AuthButton>
        );
    }
    return (
        <AuthButton
            onClick={async () => {
                await auth.clearStaleState();
                await auth.signinRedirect();
            }}
        >
            Login
        </AuthButton>
    );
};

export default AuthPortal;
