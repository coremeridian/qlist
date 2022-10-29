import { FetchBaseQueryError, EntityState } from "@reduxjs/toolkit";

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
    error: unknown
): error is { message: string } {
    return (
        typeof error === "object" &&
        error != null &&
        "message" in error &&
        typeof (error as any).message === "string"
    );
}

type EntityOrNot<T> = EntityState<T> | any;

export function provideItemTag<T, R>(tag: string) {
    return (result: EntityOrNot<T>, error: unknown, id: R) =>
        result
            ? [{ type: tag, id }]
            : error?.status === 401
            ? ["UNAUTHENTICATED"]
            : error?.status === 403
            ? ["UNAUTHORIZED"]
            : ["UNKNOWN_ERROR"];
}

export function provideItemsTag<T>(tag: string) {
    return (result: EntityOrNot<T>, error: unknown) =>
        !error
            ? [
                  { type: tag, id: "LIST" },
                  ...result.ids.map((id) => ({
                      type: tag,
                      id,
                  })),
              ]
            : error?.status === 401
            ? ["UNAUTHENTICATED"]
            : error?.status === 403
            ? ["UNAUTHORIZED"]
            : ["UNKNOWN_ERROR"];
}
