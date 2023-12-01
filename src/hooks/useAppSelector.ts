import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../shared/store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
