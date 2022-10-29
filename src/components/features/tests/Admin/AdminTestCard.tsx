import React from "react";
import { Card, VersionTag } from "../Feed/styles";
import { selectTestById, usePublishTestMutation } from "../api";
import { useAppSelector, RootState } from "@App/store";
import { Button } from "@App/styles";
import { Test } from "../types";
import Skeleton from "react-loading-skeleton";

const AdminTestCard = ({ id }) => {
    const test: Test = useAppSelector((state: RootState) =>
        selectTestById(state, id)
    );

    const [publishTest, { error, isUninitialized, isSuccess, reset }] =
        usePublishTestMutation();

    return (
        <Card to={id}>
            <article className="h-full">
                <VersionTag>Preliminary</VersionTag>
                <div className="flex flex-col justify-between h-full">
                    <div className="mt-4 text-gray-500 sm:pr-8">
                        <h5 className="mt-4 text-xl font-bold text-gray-900">
                            {test.title}
                        </h5>
                        <p className="mt-1 text-xs font-medium text-gray-600">
                            12 Minute Administration Time
                        </p>
                        <p className="mt-2 text-sm">{test.description}</p>
                    </div>
                    <Button
                        onClick={async (event) => {
                            event.preventDefault();
                            if (isUninitialized && !test.is_published) {
                                await publishTest({
                                    id: test.id,
                                    name: test.title,
                                    amount: test.price || "1500",
                                })
                                    .unwrap()
                                    .catch((rejected) => {
                                        console.error(rejected);
                                        reset();
                                    });
                            }
                        }}
                    >
                        {(isUninitialized && "Publish") ||
                            isSuccess ||
                            (test.is_published && "Published") || <p>Error</p>}
                    </Button>
                    <div className="sticky inset-x-0 p-2 sm:flex justify-between items-center">
                        <dl className="flex mt-6">
                            <div className="flex flex-col">
                                <dt className="text-sm font-medium text-gray-600">
                                    Published
                                </dt>
                                <dd className="text-xs text-gray-500">
                                    31st June, 2021
                                </dd>
                            </div>
                            <div className="flex flex-col ml-3 ml-6">
                                <dt className="text-sm font-medium text-gray-600">
                                    Alotted time
                                </dt>
                                <dd className="text-xs text-gray-500">
                                    3 minute
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </article>
        </Card>
    );
};

export default AdminTestCard;
