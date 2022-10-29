import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { AuthProvider } from "react-oidc-context";
import { useStorePersistor } from "@App/store";
import AuthLayer from "@features/authentication/AuthLayer";
import ErrorBoundary from "components/ErrorBoundary";
import MoonLoader from "react-spinners/MoonLoader";
import type { ConfigReader } from "./config";

let PersistGate = React.lazy(() => import("./helpers/PersistGateDefault"));

const AppLoader = (configReader: ConfigReader, store, children) => (props) => {
    const config = configReader.read();
    return (
        <AuthProvider key="App" {...config} {...props}>
            <Provider store={store}>
                <AuthLayer>{children}</AuthLayer>
            </Provider>
        </AuthProvider>
    );
};

const AppLayer = ({
    configReader,
    store,
    children,
}: {
    configReader: ConfigReader;
}) => {
    const LoadedCore = configReader.fromServer
        ? AppLoader(
            configReader,
            store,
            <HelmetProvider>{children}</HelmetProvider>
        )
        : AppLoader(
            configReader,
            store,
            <PersistGate loading={null} persistor={useStorePersistor(store)}>
                <HelmetProvider>{children}</HelmetProvider>
            </PersistGate>
        );

    return (
        <React.Suspense
            fallback={
                <MoonLoader
                    color="#254f7b"
                    cssOverride={{
                        margin: "45vh auto 0",
                    }}
                />
            }
        >
            <LoadedCore />
        </React.Suspense>
    );
};
const Root = (props) => {
    return <ErrorBoundary>{[<AppLayer key="App" {...props} />]}</ErrorBoundary>;
};

export default Root;
