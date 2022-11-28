import React from "react";
import { useForm } from "react-hook-form";
import { Button as FormButton } from "@App/styles/Form";
import { useAddNewTestMutation } from "@features/tests/api";
import { useAppSelectFullName } from "@features/users";
import { useNavigate } from "react-router-dom";

const Section = ({ title, children }) => {
    return (
        <section className="relative block flex flex-col gap-10 pt-2 px-8 pb-8 overflow-hidden rounded-lg shadow-md">
            <span className="absolute inset-y-0 w-2 left-0 h-full bg-gradient-to-b from-green-300 via-blue-500 to-primary-900" />
            <span className="text-xl font-medium">{title}</span>
            {children}
        </section>
    );
};
const TestForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitSuccessful },
    } = useForm();
    const navigate = useNavigate();
    watch("title");
    const [addNewTest, { error }] = useAddNewTestMutation();
    const author = useAppSelectFullName();
    return (
        <form
            onSubmit={handleSubmit(async (test) => {
                test.author = author;
                test.content = "Nothing lol!";
                await addNewTest(test);
                navigate("../../tests", { replace: true });
            })}
            className="flex flex-col gap-8 bg-white h-full p-10"
        >
            <Section title="Authorship">
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
                    <label className="sr-only" htmlFor="desc">
                        Title
                    </label>
                    <textarea
                        className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
                        placeholder="Add a description"
                        type="text"
                        name="desc"
                        {...register("description", {
                            required: true,
                        })}
                    />
                    {errors.desc && <span>This field is required</span>}
                </div>
                <div className="mt-4">
                    <FormButton type="submit">
                        <span className="font-semibold">Post</span>
                        {error && error.status}{" "}
                        {error && JSON.stringify(error.data)}
                    </FormButton>
                </div>
            </Section>
            <Section title="Markup">
                <div className="h-full bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center justify-center h-full p-10 rounded-lg border-2 border-dashed border-slate-300 text-slate-300">
                        <span>Upload Test</span>
                    </div>
                </div>
            </Section>
        </form>
    );
};

export default TestForm;
