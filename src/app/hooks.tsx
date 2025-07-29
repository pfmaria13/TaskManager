import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

/**
 * Кастомный хук для типизированного использования useSelector из Redux
 * @template TState - Тип состояния Redux
 * @returns {TypedUseSelectorHook<TState>} - Типизированная версия useSelector
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
