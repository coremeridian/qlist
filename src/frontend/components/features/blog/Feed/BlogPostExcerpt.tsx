import React, { useMemo, useCallback } from "react";
import { Post, Footer } from "./styles";
import { useAppSelector } from "@App/store";
import { selectBlogPostById } from "../api";
import { Link } from "react-router-dom";
import ReadOnlyEditor from "@features/richTextEditor/ReadOnly";

const BlogPostExcerpt = ({ id }: { id: string }) => {
    const blogPost = useAppSelector((state) => selectBlogPostById(state, id));
    const content = JSON.parse(blogPost.content);
    return (
        <article className="prose lg:prose-xl">
            <Post>
                <h2>{blogPost.title}</h2>
                <span className="truncate">
                    <ReadOnlyEditor content={content} />
                </span>
                <Footer>
                    <span>Psychometrics, Development</span>
                    <Link to={id}>...More</Link>
                </Footer>
            </Post>
        </article>
    );
};

export default BlogPostExcerpt;
