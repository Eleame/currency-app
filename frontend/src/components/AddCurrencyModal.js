import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../features/currencies/currencySlice';

const AddCurrencyModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    const onSaveCurrencyClicked = async () => {
        if (name && image) {
            const uppercaseName = name.toUpperCase();
            await dispatch(addCurrency({ name: uppercaseName, image }));
            onClose();
        }
    };

    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Currency</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="currencyName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="currencyName"
                                    name="currencyName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="currencyImage" className="form-label">Image URL</label>
                                <input
                                    type="text"
                                    id="currencyImage"
                                    name="currencyImage"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={onSaveCurrencyClicked}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCurrencyModal;
