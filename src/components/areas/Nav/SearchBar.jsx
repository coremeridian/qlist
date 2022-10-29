import React from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
const SearchBar = () => {
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(watch("search"));
    return (
        <>
            <div className="flex text-xl items-center justify-end flex-1 w-0 lg:hidden">
                <button className="flex items-center py-2 px-4 bg-gray-100 space-x-4 rounded-full">
                    <span className="text-base">Search</span>
                    <BiSearch />
                </button>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-0 flex">
                    <div className="relative">
                        <input
                            placeholder="Search..."
                            type="text"
                            className="h-10 pr-10 text-sm placeholder-gray-300 border-gray-200 rounded-lg focus:z-10"
                            {...register("search")}
                        />
                        <button
                            type="submit"
                            className="absolute inset-y-0 right-0 p-2 mr-px text-gray-600 round-r-lg"
                        >
                            <BiSearch />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SearchBar;
