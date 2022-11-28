import React, { useEffect } from "react";
import { useGetAccessConstraintQuery } from "./api";
import { usePageIdentifier } from "@features/uistate/Context";
import { selectAccessConstraints } from "@features/management/api";
import { useAppSelector, RootState } from "@App/store";
import type { Access } from "./types";

const Recognizer = ({ children }) => {
    const { currentPage, mainPage } = usePageIdentifier();
    const { data } = useGetAccessConstraintQuery(mainPage, {
        refetchOnMountOrArgChange: true,
    });
    const access = data
        ? data.entities[mainPage][currentPage] ??
        data.entities[currentPage] ??
        "open"
        : "open";

    if (access == "maintenance")
        return <p>Currently in maintenance mode. Please check back later</p>;
    if (access == "presentation")
        return (
            <p>
                Currently in presentation mode. Some functionality will not be
                accessible
            </p>
        );
    return <>{children}</>;
};

const Section = ({ id, children }) => {
    const accessConstraints = useAppSelector((state: RootState) =>
        selectAccessConstraints(state)
    )[0];
    let access: Access;
    if ((access = accessConstraints[id])) {
        if (access == "maintenance")
            return (
                <p>Currently in maintenance mode. Please check back later</p>
            );
        if (access == "presentation")
            return (
                <p>
                    Currently in presentation mode. Some functionality will not
                    be accessible
                </p>
            );
    }
    return <>{children}</>;
};

const AccessControl = Object.assign(Recognizer, { Section });
export default AccessControl;
