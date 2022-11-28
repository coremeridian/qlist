import React from "react";
import { Card, VersionTag } from "./styles";
import { selectTestById, useCheckoutTestMutation } from "../api";
import { selectId } from "@features/users/userSlice";
import { useAppSelector, RootState } from "@App/store";
import { Button } from "@App/styles";
import { Test } from "../types";

const TestCard = ({ id }) => {
    const test: Test = useAppSelector((state: RootState) =>
        selectTestById(state, id)
    );
    const userid = useAppSelector((state: RootState) => selectId(state));
    const [
        checkoutTest,
        { data: sessionUrl, error, isLoading, isError, reset },
    ] = useCheckoutTestMutation();
    if (sessionUrl) {
        window.location.replace(sessionUrl);
        return null;
    } else {
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
                        <div className="flex justify-evenly">
                            <Button>Save</Button>
                            <Button
                                onClick={async (event) => {
                                    event.preventDefault();
                                    checkoutTest({
                                        userid,
                                        priceid: test.priceid,
                                        testid: test.id,
                                        testTitle: test.title,
                                    });
                                }}
                            >
                                Take Test - $15
                            </Button>
                        </div>
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
    }
};

export default TestCard;
