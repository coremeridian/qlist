import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { api } from "@features/api";
import { provideItemTag, provideItemsTag } from "@features/api/helpers";
import type { BlogPost, BlogPosts } from "./types";
import { selectFirstName, selectLastName } from "@features/users/userSlice";

const tag = "BlogPost";
const blogAdapter = createEntityAdapter<Blog>({
    selectId: (blogPost) => blogPost._id,
});
const initialState = blogAdapter.getInitialState();

export const blogApi = api
    .enhanceEndpoints({ addTagTypes: [tag] })
    .injectEndpoints({
        endpoints: (build) => ({
            getBlogPost: build.query<BlogPost, string>({
                query: (id) => `/blog/post/${id}`,
                transformResponse: (responseData) => responseData.blogPost,
                providesTags: provideItemTag<BlogPost, string>(tag),
            }),
            getBlogPosts: build.query<BlogPosts, void>({
                query: () => "/blog/posts",
                transformResponse: (responseData) =>
                    blogAdapter.setAll(initialState, responseData),
                providesTags: provideItemsTag<BlogPosts>(tag),
            }),
            addBlogPost: build.mutation<BlogPost, Partial<BlogPost>>({
                query: (post) => ({
                    url: "/blog/posts",
                    method: "POST",
                    body: post,
                }),
                invalidateTags: [{ type: tag, id: "LIST" }],
            }),
        }),
    });

export const selectBlogPostsResult = blogApi.endpoints.getBlogPosts.select();

const selectBlogPostsData = createSelector(
    selectBlogPostsResult,
    (blogPostsResult) => blogPostsResult.data
);

export const {
    selectAll: selectLatestBlogPosts,
    selectById: selectBlogPostById,
    selectIds: selectBlogPostsIds,
} = blogAdapter.getSelectors(
    (state) => selectBlogPostsData(state) ?? initialState
);

export const selectBlogPostsByUser = createSelector(
    [selectLatestBlogPosts, (state, authorId) => authorId],
    (blogPosts, authorId) =>
        blogPosts.filter((post) => post.authorId === authorId)
);

export const {
    useGetBlogPostQuery,
    useGetBlogPostsQuery,
    useAddBlogPostMutation,
    useSaveBlogPostMutation,
} = blogApi;
