import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "@App/store";
import { selectRoles, selectScope } from "@features/users/userSlice";

interface RequireAuthProps {
    onRoles?: string[];
    onScopes?: string[];
}

const RequireAuth = (authProps: RequireAuthProps) => {
    const auth = useAuth();
    const location = useLocation();
    const roles = useAppSelector(selectRoles);
    const scope = useAppSelector(selectScope);

    if (!auth.isAuthenticated && !auth.isLoading) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } else if (auth.user) {
        const path = location.state?.from?.pathname || "/tests";
        if (
            (authProps.onRoles?.every((val) => roles.includes(val)) ||
                !authProps.onRoles ||
                authProps.onRoles?.length == 0) &&
            (authProps.onScopes?.every((val) => scope.includes(val)) ||
                !authProps.onScopes ||
                authProps.onScopes?.length == 0)
        )
            return <Outlet />;
        else return <Navigate to={path} state={{ from: location }} replace />;
    } else return <p>Loading</p>;
};

export default RequireAuth;
