import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; 
import { DataGrid } from '@mui/x-data-grid';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const barData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: '# of Votes',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'age', headerName: 'Age', type: 'number', width: 110 },
        { field: 'email', headerName: 'Email', width: 200 },
    ];

    const rows = [
        { id: 1, name: 'John Doe', age: 35, email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', age: 42, email: 'jane.smith@example.com' },
        { id: 3, name: 'Alice Johnson', age: 28, email: 'alice.johnson@example.com' },
        { id: 4, name: 'Bob Brown', age: 50, email: 'bob.brown@example.com' },
    ];
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="dashboard">
            <h1>Welcome to the Dashboard</h1>
            <div className="dashboard-content">
                <div className="left-column">
                    <div className="charts">
                        <div className="chart-container">
                            <Line data={lineData} />
                        </div>
                        <div className="chart-container">
                            <Bar data={barData} />
                        </div>
                        <div className="chart-container">
                            <Pie data={pieData} />
                        </div>
                    </div>
                </div>
                <div className="right-column">
                    <div className="data-table">
                        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                    </div>
                </div>
            </div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default Dashboard;