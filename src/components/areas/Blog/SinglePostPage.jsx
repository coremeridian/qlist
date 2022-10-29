import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogPostQuery, selectBlogPostById } from "@features/blog/api";
import ReadOnlyEditor from "@features/richTextEditor/ReadOnly";
import { useAppSelector } from "@App/store";

const SinglePostPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.blogId;
    const blogPost = useAppSelector((state) => selectBlogPostById(state, id));
    const skip = !!blogPost;
    const { data, isLoading, isError, error, refetch } = useGetBlogPostQuery(
        id,
        { skip }
    );

    let content;
    const post = skip ? blogPost : data;
    if (isLoading) {
        // Add skeleton here
    } else if (post) {
        const body = JSON.parse(post.content);
        content = (
            <div className="mx-auto md:mx-10 lg:mx-28 h-full bg-white">
                <div className="grid grid-cols-1 px-6 py-6 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    <div className="bg-green-200 h-full md:col-span-2 lg:col-span-3">
                        <ReadOnlyEditor content={body} />
                    </div>
                    <div className="bg-red-500 h-full">
                        <span>
                            This is where more informaiton about the author goes
                            in
                        </span>
                    </div>
                </div>
            </div>
        );
    } else if (isError) {
        if ("status" in error)
            content = <NetworkErrorPage retryAction={refetch} />;
        else content = <div>{error.message}</div>;
    } else content = <div>No content</div>;

    return <>{content}</>;
};

export default SinglePostPage;
