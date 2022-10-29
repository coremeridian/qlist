import React from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { Button as FormButton } from "@App/styles/Form";
import RichTextEditor from "@features/richTextEditor";
import { useForm } from "react-hook-form";
import { useAddBlogPostMutation } from "@features/blog/api";
import { useAppDispatch, useAppSelector } from "@App/store";
import { popDraft } from "@features/blog/draftSlice";
import { selectFirstName, selectLastName } from "@features/users/userSlice";

const BlogForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitSuccessful },
    } = useForm();
    const [addBlogPost, { error }] = useAddBlogPostMutation();
    const dispatch = useAppDispatch();

    if (isSubmitSuccessful) dispatch(popDraft);
    const author =
        useAppSelector(selectFirstName) + " " + useAppSelector(selectLastName);
    const onSubmit = async (post) => {
        post.author = author;
        await addBlogPost(post);
    };
    return (
        <section className="flex flex-col gap-2 p-8 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center">
                <span className="font-bold text-2xl">Blog Post</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="sr-only" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
                        placeholder="Title"
                        type="text"
                        name="title"
                        {...register("title", {
                            required: true,
                        })}
                    />
                    {errors.title && <span>This field is required</span>}
                </div>
                <div>
                    <label className="sr-only" htmlFor="author">
                        Author
                    </label>
                    <input
                        className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
                        type="text"
                        name="author"
                        value={author}
                        readOnly
                        {...register("author")}
                    />
                </div>
                <div>
                    <label className="sr-only" htmlFor="post">
                        Blog Post
                    </label>
                    <div
                        className="resize-none w-full p-3 text-sm border
                        border-gray-200 rounded-lg focus:outline-none
                        focus:border-cyan-500"
                        name="post"
                    >
                        <RichTextEditor control={control} name="content" />
                    </div>
                    {errors.content && <span>This field is required</span>}
                </div>
                <div>
                    <label className="sr-only" htmlFor="tag">
                        Tag
                    </label>
                    <CreatableSelect name="tag" />
                </div>
                <div className="mt-4">
                    <FormButton type="submit">
                        <span className="font-semibold">Post</span>
                        {error && error.status}{" "}
                        {error && JSON.stringify(error.data)}
                    </FormButton>
                </div>
            </form>
        </section>
    );
};

export default BlogForm;
