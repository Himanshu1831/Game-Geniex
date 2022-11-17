import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, Dispatch } from "../redux/api/store";

export const useAppDispatch: () => Dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector