import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import './CurrencyChart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CurrencyChart = () => {
    const selectedCurrency = useSelector(state => state.currencies.selectedCurrency);

    if (!selectedCurrency || !selectedCurrency.values) {
        return null;
    }

    const sortedValues = selectedCurrency.values.slice().sort((a, b) => new Date(a.time) - new Date(b.time));

    const data = {
        labels: sortedValues.map(value => new Date(value.time).toLocaleString()),
        datasets: [
            {
                label: 'Amount in USD',
                data: sortedValues.map(value => value.amount),
                backgroundColor: sortedValues.map((value, index, arr) => {
                    if (index === 0) return 'green';
                    return value.amount < arr[index - 1].amount ? 'green' : 'red';
                }),
            },
        ],
    };

    return (
        <div className="bar-chart">
            <Bar data={data} />
        </div>
    );
};

export default CurrencyChart;
