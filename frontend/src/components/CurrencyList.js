import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrencies, selectCurrency } from '../features/currencies/currencySlice';
import './CurrencyList.css';

const CurrencyList = () => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.currencies.currencies);
    const selectedCurrency = useSelector(state => state.currencies.selectedCurrency);
    const status = useSelector(state => state.currencies.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCurrencies());
        }
    }, [status, dispatch]);

    const handleCurrencyClick = (currencyId) => {
        dispatch(selectCurrency(currencyId));
    };

    return (
        <div className="currency-list-container mb-4">
            <h2>Currency List</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && (
                <ul className="list-group">
                    {currencies.map(currency => (
                        <li
                            key={currency._id}
                            onClick={() => handleCurrencyClick(currency._id)}
                            className={`list-group-item d-flex align-items-center ${selectedCurrency && selectedCurrency._id === currency._id ? 'active' : ''}`}
                        >
                            <img src={currency.image} alt={currency.name} className="currency-icon me-2" />
                            {currency.name}
                        </li>
                    ))}
                </ul>
            )}
            {status === 'failed' && <p>Error loading currencies.</p>}
        </div>
    );
};

export default CurrencyList;
