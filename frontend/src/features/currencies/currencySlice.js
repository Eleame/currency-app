import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    currencies: [],
    selectedCurrency: null,
    status: 'idle',
    error: null,
};

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', async () => {
    const response = await axios.get('/api/currencies');
    return response.data;
});

export const addCurrency = createAsyncThunk('currencies/addCurrency', async (currency, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/currencies', currency);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addValue = createAsyncThunk('currencies/addValue', async ({ id, value }) => {
    const response = await axios.post(`/api/currencies/${id}/values`, value);
    return response.data;
});

export const deleteValue = createAsyncThunk('currencies/deleteValue', async ({ id, valueId }) => {
    const response = await axios.delete(`/api/currencies/${id}/values/${valueId}`);
    return response.data;
});

export const updateValue = createAsyncThunk('currencies/updateValue', async ({ id, valueId, value }) => {
    const response = await axios.put(`/api/currencies/${id}/values/${valueId}`, value);
    return response.data;
});

export const fetchCurrencyPrice = createAsyncThunk('currencies/fetchCurrencyPrice', async (currency) => {
    const response = await axios.get(`/api/currencies/price/${currency}`);
    return response.data;
});

const currencySlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        selectCurrency: (state, action) => {
            state.selectedCurrency = state.currencies.find(currency => currency._id === action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrencies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCurrencies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currencies = action.payload;
            })
            .addCase(fetchCurrencies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCurrency.fulfilled, (state, action) => {
                state.currencies.push(action.payload);
            })
            .addCase(addCurrency.rejected, (state, action) => {
                state.error = action.payload.error;
            })
            .addCase(addValue.fulfilled, (state, action) => {
                const updatedCurrency = action.payload;
                const existingCurrency = state.currencies.find((currency) => currency._id === updatedCurrency._id);
                if (existingCurrency) {
                    existingCurrency.values = updatedCurrency.values;
                }
            })
            .addCase(deleteValue.fulfilled, (state, action) => {
                const updatedCurrency = action.payload;
                const existingCurrency = state.currencies.find((currency) => currency._id === updatedCurrency._id);
                if (existingCurrency) {
                    existingCurrency.values = updatedCurrency.values;
                }
            })
            .addCase(updateValue.fulfilled, (state, action) => {
                const updatedCurrency = action.payload;
                const existingCurrency = state.currencies.find((currency) => currency._id === updatedCurrency._id);
                if (existingCurrency) {
                    existingCurrency.values = updatedCurrency.values;
                }
            })
            .addCase(fetchCurrencyPrice.fulfilled, (state, action) => {
                const priceData = action.payload;
                if (state.selectedCurrency) {
                    state.selectedCurrency = {
                        ...state.selectedCurrency,
                        price: priceData.USDT,
                    };
                }
            });
    },
});

export const { selectCurrency } = currencySlice.actions;

export default currencySlice.reducer;
