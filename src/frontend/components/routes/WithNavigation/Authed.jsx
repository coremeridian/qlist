import React, { useState } from "react";
import NavigationLayout from "./index";
import { AuthedNavBar as BlogAuthedNavBar } from "components/areas/Blog";
import { AuthedNavBar as TestsAuthedNavBar } from "components/areas/Tests";
import { PageIdentifier } from "@features/uistate/Context";
import AccessControl from "@features/management/AccessControl";

const Blog = () => (
    <PageIdentifier.Page id={"blog"}>
        <AccessControl>
            <NavigationLayout bar={<BlogAuthedNavBar />} />
        </AccessControl>
    </PageIdentifier.Page>
);
const Tests = () => (
    <PageIdentifier.Page id={"tests"}>
        <AccessControl>
            <NavigationLayout bar={<TestsAuthedNavBar />} />
        </AccessControl>
    </PageIdentifier.Page>
);

export { Blog, Tests };
