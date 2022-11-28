import React from "react";
import AuthenticatedNavBar from "../Nav/AuthenticatedBar";
import { withMenuLink } from "../Nav/AuthenticatedBar/hooks";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

export const AuthedNavBar = withMenuLink(AuthenticatedNavBar, {
    icon: FiPlus,
    path: "post",
});
