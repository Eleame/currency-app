import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../features/currencies/currencySlice';

const CurrencyForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    const onSaveCurrencyClicked = () => {
        if (name && image) {
            dispatch(addCurrency({ name, image }));
            setName('');
            setImage('');
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Currency</h2>
                <form>
                    <label htmlFor="currencyName">Name:</label>
                    <input
                        type="text"
                        id="currencyName"
                        name="currencyName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="currencyImage">Image:</label>
                    <input
                        type="text"
                        id="currencyImage"
                        name="currencyImage"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <button type="button" onClick={onSaveCurrencyClicked}>
                        Save
                    </button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CurrencyForm;
