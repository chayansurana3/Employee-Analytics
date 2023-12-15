import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';
import "./card.css";

Chart.register(...registerables);
function EmployeeDetailsCard({ employeeData, onEdit, onDelete, deleting }) {
    const {
        empId,
        firstName,
        lastName,
        age,
        gender,
        position,
        salary,
        department,
        email
    } = employeeData;

    const chartData = {
        labels: ['Salary'],
        datasets: [
            {
                label: 'Salary',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [salary],
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="employee-card">
            <h2>{`${firstName} ${lastName}`}</h2>
            <p>Employee ID: {empId}</p>
            <p>Age: {age}</p>
            <p>Gender: {gender}</p>
            <p>Position: {position}</p>
            <p>Department: {department}</p>
            <p>Email: {email}</p>

            <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
            </div>

            <div className="actions">
                <button onClick={() => onEdit(empId)}>Edit</button>
                <button onClick={() => onDelete(empId)}>{deleting ? 'Deleting...' : 'Delete'}</button>
            </div>
        </div>
    );
};

EmployeeDetailsCard.propTypes = {
    employeeData: PropTypes.shape({
        empId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        gender: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        salary: PropTypes.number.isRequired,
        department: PropTypes.string.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default EmployeeDetailsCard;