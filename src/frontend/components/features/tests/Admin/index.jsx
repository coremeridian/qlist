import React, { useEffect, useMemo } from "react";
import AdminTestCard from "./AdminTestCard";
import TestFeedSkeleton from "../Feed/TestFeedSkeleton";
import { Grid } from "../Feed/styles";
import { useGetTestsQuery } from "../api";
import NetworkErrorPage from "components/ErrorBoundary/NetworkErrorPage";
import NoContentPage from "components/ErrorBoundary/NoContentPage";

const AdminTestFeed = () => {
    const {
        data: tests,
        isFetching,
        error,
        refetch,
    } = useGetTestsQuery(
        {
            with_unpublished: true,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    let content;

    useEffect(() => {
        console.log("TESTS", tests, content);
    }, [content, tests]);

    if (isFetching) {
        content = <TestFeedSkeleton />;
    } else if (tests) {
        content = (
            <Grid>
                {tests.ids.map((id, index) => (
                    <AdminTestCard key={index} id={id} />
                ))}
            </Grid>
        );
    } else if (error) {
        if ("status" in error) {
            content = <NetworkErrorPage onClick={refetch} />;
        } else {
            content = <div>{error.message}</div>;
        }
    } else {
        content = <NoContentPage />;
    }
    return <>{content}</>;
};

export default AdminTestFeed;
