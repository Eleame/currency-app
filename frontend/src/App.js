import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddCurrencyModal from './components/AddCurrencyModal';
import ValueForm from './components/ValueForm';
import ValueTable from './components/ValueTable';
import CurrencyChart from './components/CurrencyChart';
import CurrencyList from './components/CurrencyList';
import { fetchCurrencies, selectCurrency, fetchCurrencyPrice } from './features/currencies/currencySlice';


function App() {
    const dispatch = useDispatch();
    const selectedCurrency = useSelector(state => state.currencies.selectedCurrency);
    const [isAddCurrencyModalOpen, setIsAddCurrencyModalOpen] = useState(false);
    const [isAddValueModalOpen, setIsAddValueModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCurrencies());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCurrency) {
            dispatch(fetchCurrencyPrice(selectedCurrency.name));
        }
    }, [selectedCurrency, dispatch]);

    const handleAddCurrencyClick = () => {
        setIsAddCurrencyModalOpen(true);
    };

    const handleCloseCurrencyModal = () => {
        setIsAddCurrencyModalOpen(false);
    };

    const handleAddValueClick = () => {
        setIsAddValueModalOpen(true);
    };

    const handleCloseValueModal = () => {
        setIsAddValueModalOpen(false);
    };

    return (
        <div className="App container">
            <header className="App-header bg-dark text-white p-4 mb-4 d-flex justify-content-between align-items-center">
                <button className="btn btn-primary" onClick={handleAddCurrencyClick}>+ Add Currency</button>
                {selectedCurrency && (
                    <>
                        <div className="currency-header d-flex align-items-center">
                            <img src={selectedCurrency.image} alt={selectedCurrency.name} className="currency-image me-2" />
                            <h2 className="mb-0">{selectedCurrency.name}</h2>
                        </div>
                        <h3 className="mb-0">Actual Price: {selectedCurrency.price} USDT</h3>
                        <button className="btn btn-success" onClick={handleAddValueClick}>+ Add Values</button>
                    </>
                )}
            </header>
            <main>
                {isAddCurrencyModalOpen && <AddCurrencyModal onClose={handleCloseCurrencyModal} />}
                <CurrencyList />
                {selectedCurrency && (
                    <>
                        {isAddValueModalOpen && <ValueForm currencyId={selectedCurrency._id} onClose={handleCloseValueModal} />}
                        <ValueTable currencyId={selectedCurrency._id} />
                        <CurrencyChart />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
