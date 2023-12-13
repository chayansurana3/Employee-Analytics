import React, { useState, useEffect } from "react";
import { Bar, Doughnut, Scatter } from 'react-chartjs-2';
import "./home.css";

function Home() {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    document.title = "Organization Analytics";

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/employees/all');
        if (response.ok) {
          const data = await response.json();
          setEmployeeData(data);
        } else {
          console.error('Error fetching employee data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };
    fetchData();
  }, []);

  const averageSalary = () => {
    if (employeeData.length === 0) {
      return 0;
    }
    const totalSalary = employeeData.reduce((acc, employee) => acc + (employee.salary || 0), 0);
    return totalSalary / employeeData.length;
  };

  const totalDepartments = () => {
    const departmentsSet = new Set(employeeData.map(employee => employee.department));
    return departmentsSet.size;
  };

  const highestSalary = () => {
    if (employeeData.length === 0) {
      return 0;
    }
    return Math.max(...employeeData.map(employee => (employee.salary || 0)));
  };

  const lowestSalary = () => {
    if (employeeData.length === 0) {
      return 0;
    }
    return Math.min(...employeeData.map(employee => (employee.salary || 0)));
  };

  const totalEmployeesByGender = (gender) => {
    return employeeData.filter(employee => employee.gender === gender).length;
  };

  const ageData = {
    labels: Array.from({ length: 10 }, (_, i) => `${i * 10 + 1}-${(i + 1) * 10}`),
    datasets: [{
      label: 'Age Distribution',
      data: employeeData.map(employee => employee.age || 0),
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
    }]
  };

  const ageOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Employee ID',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Age',
        },
      },
    },
  };

  const departmentCountData = {
    labels: Array.from(new Set(employeeData.map(employee => employee.department))),
    datasets: [{
      data: Array.from(new Set(employeeData.map(employee => employee.department)))
        .map(department => employeeData.filter(employee => employee.department === department).length),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#66ff99', '#ffcc66',
        '#9933ff', '#ff6666', '#99ccff', '#ff9966', '#66cccc',
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#66ff99', '#ffcc66',
        '#9933ff', '#ff6666', '#99ccff', '#ff9966', '#66cccc',
      ],
    }]
  };

  const salaryData = {
    labels: Array.from({ length: employeeData.length }, (_, i) => `Employee ${i + 1}`),
    datasets: [{
      label: 'Salary Distribution',
      data: employeeData.map((employee) => ({
        x: employee.empId,
        y: employee.salary || 0,
      })),
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 10,
    }]
  };

  const salaryOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Employee ID',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Salary',
        },
      },
    },
  };

  const genderData = {
    labels: ['Male', 'Female', 'Others'],
    datasets: [{
      data: [
        totalEmployeesByGender('Male'),
        totalEmployeesByGender('Female'),
        totalEmployeesByGender('Others'),
      ],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
    }]
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchResults([]);
  };

  const handleSearchSubmit = () => {
    const results = employeeData.filter(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchResults(results);
  };

  const clearSearchResults = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div>
      <div className="landing-page">
        <h1>Welcome to the Employee Dashboard</h1>
        <div className="overview">
          <h1>Overview</h1>
          <div className="key-metrics">
            <div className="metric">
              <span>Total Employees:</span> <span>{employeeData.length}</span>
            </div>
            <div className="metric">
              <span>Average Salary:</span> <span>₹{averageSalary().toFixed(2)}</span>
            </div>
            <div className="metric">
              <span>Total Departments:</span> <span>{totalDepartments()}</span>
            </div>
            <div className="metric">
              <span>Highest Salary Paid:</span> <span>₹{highestSalary()}</span>
            </div>
            <div className="metric">
              <span>Lowest Salary Paid:</span> <span>₹{lowestSalary()}</span>
            </div>
            <div className="metric">
              <span>Total Male Employees:</span> <span>{totalEmployeesByGender('Male')}</span>
            </div>
            <div className="metric">
              <span>Total Female Employees:</span> <span>{totalEmployeesByGender('Female')}</span>
            </div>
            <div className="metric">
              <span>Total Transgender Employees:</span> <span>{totalEmployeesByGender('Others')}</span>
            </div>
          </div>
        </div>
        <div className="charts">
          <h1>Organisation DataPoints</h1>
          <div className="chart-card">
            <h2 className="chart-title">Age Distribution</h2>
            <div className="chart">
              <Bar data={ageData} options={ageOptions} />
            </div>
          </div>
          <div className="chart-card">
            <h2 className="chart-title">Salary Distribution</h2>
            <div className="chart">
              <Scatter data={salaryData} options={salaryOptions} />
            </div>
          </div>
          <div className="chart-card">
            <h2 className="chart-title">Department Employee Count</h2>
            <div className="chart">
              <Doughnut data={departmentCountData} />
            </div>
          </div>
          <div className="chart-card">
            <h2 className="chart-title">Gender Distribution</h2>
            <div className="chart">
              <Doughnut data={genderData} />
            </div>
          </div>
        </div>
        <div className="search-container">
          <h1>Find Employees</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name, position, or department..."
              value={searchQuery}
              onChange={handleSearchChange}
            /><br></br>
            <button onClick={handleSearchSubmit}>Search</button>
            <button onClick={clearSearchResults}>Clear</button>
          </div>
          <div className="search-results">
            {searchResults.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th className="home-th">Employee ID</th>
                    <th className="home-th">Name</th>
                    <th className="home-th">Department</th>
                    <th className="home-th">Position</th>
                    <th className="home-th">Salary</th>
                    <th className="home-th">Gender</th>
                    <th className="home-th">Age</th>
                    <th className="home-th">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.empId}</td>
                      <td>{`${result.firstName} ${result.lastName}`}</td>
                      <td>{result.department}</td>
                      <td>{result.position}</td>
                      <td>{result.salary}</td>
                      <td>{result.gender}</td>
                      <td>{result.age}</td>
                      <td>{result.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;