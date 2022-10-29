import React from "react";
import AuthenticatedNavBar from "../Nav/AuthenticatedBar";
import { withMenuLink } from "../Nav/AuthenticatedBar/hooks";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";

export const AuthedNavBar = withMenuLink(AuthenticatedNavBar, {
    icon: FiUpload,
    path: "post",
});
