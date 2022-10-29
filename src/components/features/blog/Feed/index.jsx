import React from "react";
import { useGetBlogPostsQuery } from "../api";
import { Frame } from "./styles";
import BlogPostExcerpt from "./BlogPostExcerpt";
import NetworkErrorPage from "components/ErrorBoundary/NetworkErrorPage";
import NoContentPage from "components/ErrorBoundary/NoContentPage";

const BlogFeed = () => {
    const {
        data: posts = [],
        isLoading,
        isSuccess,
        error,
        refetch,
    } = useGetBlogPostsQuery();

    let content;
    if (isLoading) {
        content = <div>Loading Skeleton Goes Here</div>;
    } else if (isSuccess) {
        content = (
            <Frame>
                {posts.ids.map((id, index) => (
                    <BlogPostExcerpt key={index} id={id} />
                ))}
            </Frame>
        );
    } else if (error) {
        if ("status" in error)
            content = <NetworkErrorPage retryAction={refetch} />;
        else content = <div>{error.message}</div>;
    } else content = <NoContentPage />;

    return <>{content}</>;
};

export default BlogFeed;
