import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { api } from "@features/api";
import type {
    Test,
    Tests,
    TestCreationRequest,
    TestPublishRequest,
    TestRequestOptions,
} from "./types";
import type { TestSessionRequest } from "@features/testsessions/types";
import { provideItemTag, provideItemsTag } from "@features/api/helpers";
import { appConfig } from "@App/config";

const tag = "Test";
const testsApiUrl = appConfig.testsApi;
const testsAdapter = createEntityAdapter<Test>({
    selectId: (test) => test.id,
});
const initialState = testsAdapter.getInitialState();

export const testsApi = api
    .enhanceEndpoints({ addTagTypes: [tag] })
    .injectEndpoints({
        endpoints: (build) => ({
            getTest: build.query<Test, number>({
                query: (id) => `${testsApiUrl}/test/${id}`,
                transformResponse: (responseData) => responseData.test,
                providesTags: provideItemTag<Test, string>(tag),
            }),
            getTests: build.query<Tests, TestRequestOptions>({
                query: (options) => ({ url: "/tests", params: options }),
                transformResponse: (responseData) =>
                    testsAdapter.setAll(initialState, responseData),
                providesTags: provideItemsTag<Tests>(tag),
                async onQueryStarted(arg, { queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        console.log("FULFILLED DATA", data);
                    } catch (err) {
                        console.log("ERROR", err);
                    }
                },
            }),
            addNewTest: build.mutation<Test, TestCreationRequest>({
                query: (test) => ({
                    url: testsApiUrl + "/tests",
                    method: "POST",
                    body: test,
                }),
                invalidateTags: [{ type: tag, id: "LIST" }],
            }),
            publishTest: build.mutation<string, TestPublishRequest>({
                query: (test) => ({
                    url: "/payment/publishTest",
                    method: "POST",
                    body: test,
                }),
                invalidateTags: [{ type: tag, id: "LIST" }],
            }),
            checkoutTest: build.mutation<string, TestSessionRequest>({
                query: ({ testTitle, ...sessionRequest }) => ({
                    url: `/payment/checkout/${testTitle}`,
                    method: "POST",
                    body: sessionRequest,
                    responseHandler: (response) => response.text(),
                }),
                invalidateTags: [{ type: tag, id: "LIST" }],
            }),
        }),
    });

export const selectTestsResult = testsApi.endpoints.getTests.select();

const selectTestsData = createSelector(
    selectTestsResult,
    (testsResult) => testsResult.data
);

export const {
    selectAll: selectLatestTests,
    selectById: selectTestById,
    selectIds: selectTestsIds,
} = testsAdapter.getSelectors(
    (state) => selectTestsData(state) ?? initialState
);

export const SelectTestsByUser = createSelector(
    [selectLatestTests, (state, userId) => userId],
    (tests, userId) => tests.filter((test) => test.user === userId)
);

export const {
    useGetTestQuery,
    useGetTestsQuery,
    useCheckoutTestMutation,
    useAddNewTestMutation,
    usePublishTestMutation,
} = testsApi;
