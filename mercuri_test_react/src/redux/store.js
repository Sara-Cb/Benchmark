import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Utilizza il localStorage come storage

import scoreReducer from "./reducers/scoreReducer";
import testReducer from "./reducers/testReducer";

const rootReducer = combineReducers({
  test: testReducer,
  score: scoreReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store, {
  serialize: false,
});

export { store, persistor };
