import type { Stock } from '@/types/stocks';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isLoading: boolean;
  data: Stock | null;
  error: string | null;
}
const initialState: InitialState = {
  isLoading: false,
  data: null,
  error: null,
};

const StocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    startStocksLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
  },
});

export const { startStocksLoading } = StocksSlice.actions;

export default StocksSlice.reducer;
