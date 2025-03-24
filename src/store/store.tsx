import { configureStore } from "@reduxjs/toolkit";
import { catsApi } from "../services/catsService";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const customMiddleware = () => (next: any) => (action: any) => {
	const result = next(action);
	return result;
};

const store = configureStore({
	reducer: {
		cats: catsApi.reducer,
		auth: authReducer,
		theme: themeReducer,
		[catsApi.reducerPath]: catsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat([catsApi.middleware, customMiddleware])
			.concat(catsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
