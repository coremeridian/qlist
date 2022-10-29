import React, { useEffect } from "react";
import type { UserActionControlType } from "@features/users/ControlPanel";
import type { PageIdentifierType } from "@features/uistate/Context/PageIdentifier";

type ProviderCompositeType = UserActionControlType | PageIdentifierType;

export const BuildProviderTree = (
    providers: React.FunctionComponent<ProviderCompositeType>[]
): React.FunctionComponent<ProviderCompositeType> => {
    useEffect(() => {
        console.log(providers.length, "Hi", providers, providers[0]);
    });
    if (providers.length <= 1) return providers[0];

    const A = providers.shift()!;
    const B = providers.shift()!;
    if (!B) return A;

    useEffect(() => {
        console.log(providers.length, "Hi - letters", A, B);
        console.log(providers.length, "Another check", providers);
    });

    return BuildProviderTree([
        ({ children }) => (
            <A>
                <B>{children}</B>
            </A>
        ),
        ...providers,
    ]);
};
