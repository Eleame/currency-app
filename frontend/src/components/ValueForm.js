import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addValue, updateValue, selectCurrency } from '../features/currencies/currencySlice';

const ValueForm = ({ currencyId, value, onClose }) => {
    const [amount, setAmount] = useState(value ? value.amount : '');
    const [time, setTime] = useState(value ? new Date(value.time).toISOString().slice(0, 16) : '');
    const dispatch = useDispatch();

    const onSaveValueClicked = async () => {
        if (amount && time) {
            const valueData = { amount, time: new Date(time) };
            if (value) {
                await dispatch(updateValue({ id: currencyId, valueId: value._id, value: valueData }));
            } else {
                await dispatch(addValue({ id: currencyId, value: valueData }));
            }
            dispatch(selectCurrency(currencyId));
            onClose();
        }
    };

    useEffect(() => {
        if (value && value.time) {
            setTime(new Date(value.time).toISOString().slice(0, 16));
        }
    }, [value]);

    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{value ? 'Edit Value' : 'Add Value'}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="valueAmount" className="form-label">Amount in USDT:</label>
                                <input
                                    type="number"
                                    id="valueAmount"
                                    name="valueAmount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="valueTime" className="form-label">Time:</label>
                                <input
                                    type="datetime-local"
                                    id="valueTime"
                                    name="valueTime"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={onSaveValueClicked}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValueForm;
