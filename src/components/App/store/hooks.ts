import { persistStore } from "redux-persist";
import { store, RootState, AppDispatch } from "./store";
import rootReducer from "./reducers";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

export const useStorePersistor = (store) => {
    if (module.hot) {
        module.hot.accept("./reducers", () => {
            store.replaceReducer(persistedReducer(persistConfig, rootReducer));
        });
    }

    return persistStore(store);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
