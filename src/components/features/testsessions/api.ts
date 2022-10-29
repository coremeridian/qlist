import { api } from "@features/api";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { provideItemTag, provideItemsTag } from "@features/api/helpers";
import { testsAPIUrl } from "@features/tests/api";
import { TestSessionRequest } from "./types.ts";

const tag = "TestSession";
const testSessionsAdapter = createEntityAdapter<TestSession>({
    selectId: (testSession) => testSession.id,
});
const initialState = testSessionsAdapter.getInitialState();

const testSessionAPIUrl = `${testsAPIUrl}/sessions`;

export const testSessionsApi = api
    .enhanceEndpoints({ addTagTypes: [tag] })
    .injectEndpoints({
        endpoints: (build) => ({
            getTestSession: build.query<TestSession, TestSessionRequest>({
                query: (request) => ({
                    url: testSessionAPIUrl,
                    param: request,
                }),
                transformResponse: (responseData) => responseData.testSession,
                providesTags: provideItemTag<TestSession, string>(tag),
            }),
            getTestSessions: build.query<TestSession, TestSessionRequest>({
                query: (request) => ({
                    url: testSessionAPIUrl,
                    param: request,
                }),
                transformResponse: (responseData) => responseData.testSession,
                providesTags: provideItemsTag<TestSession, string>(tag),
            }),
        }),
    });

export const selectTestSessionsResult =
    testSessionsApi.endpoints.getTestSessions.select();

const selectTestSessionsData = createSelector(
    selectTestSessionsResult,
    (testSessionsResult) => testSessionsResult.data
);

export const {
    selectAll: selectRecentTestSessions,
    selectById: selectTestSessionById,
    selectIds: selectTestSessionsIds,
} = testSessionsAdapter.getSelectors(
    (state) => selectTestSessionsData(state) ?? initialState
);

export const { useGetTestSessionQuery, useGetTestSessionsQuery } =
    testSessionsApi;
