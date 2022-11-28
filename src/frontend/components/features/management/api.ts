import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { api } from "@features/api";
import { provideItemTag, provideItemsTag } from "@features/api/helpers";
import { AccessConstraint } from "./types";

const tag = "Management";

const accessConstraintAdapter = createEntityAdapter<AccessConstraint>({
    selectId: (constraint) => constraint.id,
});

const initialState = accessConstraintAdapter.getInitialState();

export const managementApi = api
    .enhanceEndpoints({ addTagTypes: [tag] })
    .injectEndpoints({
        endpoints: (build) => ({
            getAccessConstraint: build.query<AccessConstraint, void>({
                query: (id) => "/management/access",
                transformResponse(response: AccessConstraint) {
                    return accessConstraintAdapter.setOne(
                        accessConstraintAdapter.getInitialState(),
                        response
                    );
                },
                async onCacheEntryAdded(
                    arg,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
                ) {
                    const ws = new WebSocket("ws://localhost:3100/access");
                    try {
                        await cacheDataloaded;

                        const listener = (e: MessageEvent) => {
                            const data = JSON.parse(event.data);
                            const isAccessConstraint = () => {
                                console.log(
                                    "Replace dummy AccessConstraint function"
                                );
                                return true;
                            };
                            if (!isAccessConstraint(data)) return;

                            updateCacheData((draft) => draft.push(data));
                        };

                        ws.addEventListener("message", listener);
                    } catch (e) {
                        // no-op in case 'cacheEntryRemoved' resolves before 'cacheDataLoaded',
                        // in which case 'cacheDataLoaded' will throw
                    }

                    await cacheEntryRemoved;

                    ws.close();
                },
            }),
        }),
    });

const selectAccessConstraintResult =
    managementApi.endpoints.getAccessConstraint.select();

const selectAccessConstraintData = createSelector(
    selectAccessConstraintResult,
    (accessConstraintResult) => accessConstraintResult.data
);

export const { selectAll: selectAccessConstraints } =
    accessConstraintAdapter.getSelectors(
        (state) => selectAccessConstraintData(state) ?? initialState
    );

export const { useGetAccessConstraintQuery } = managementApi;
