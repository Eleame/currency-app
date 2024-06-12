import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteValue, fetchCurrencies, selectCurrency } from '../features/currencies/currencySlice';
import ValueForm from './ValueForm';


const ValueTable = ({ currencyId }) => {
    const dispatch = useDispatch();
    const selectedCurrency = useSelector(state => state.currencies.selectedCurrency);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(null);

    useEffect(() => {
        dispatch(selectCurrency(currencyId));
    }, [currencyId, dispatch]);

    const onDeleteClicked = async (valueId) => {
        await dispatch(deleteValue({ id: currencyId, valueId }));
        dispatch(selectCurrency(currencyId));
    };

    const onEditClicked = (value) => {
        setCurrentValue(value);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentValue(null);
    };

    return (
        <div>
            <table className="table table-striped value-table">
                <thead>
                <tr>
                    <th>Amount in USDT</th>
                    <th>Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {selectedCurrency?.values.map((value) => (
                    <tr key={value._id}>
                        <td>{value.amount}</td>
                        <td>{new Date(value.time).toLocaleString()}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => onEditClicked(value)}>EDIT</button>
                            <button className="btn btn-danger" onClick={() => onDeleteClicked(value._id)}>DELETE</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isEditModalOpen && (
                <ValueForm
                    currencyId={currencyId}
                    value={currentValue}
                    onClose={handleCloseEditModal}
                />
            )}
        </div>
    );
};

export default ValueTable;
