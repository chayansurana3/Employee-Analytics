import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Cards/Card';
import './employeeCards.css';

function EmployeeDetails() {
  const [employeeDataList, setEmployeeDataList] = useState([]);

  const navigate = useNavigate();
  const editEmployeeData = () => navigate('/form');

  const deleteEmployeeData = async (empId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this employee record?');

    if (shouldDelete) {
      try {
        const response = await fetch(`/.netlify/functions/delete/${empId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          const updatedEmployeeList = employeeDataList.filter((employee) => employee.empId !== empId);
          setEmployeeDataList(updatedEmployeeList);
          alert('✅✅Record Deleted Successfully');
        } else {
          alert('⚠️ ALERT!! ERROR DELETING YOUR DATA');
          console.error('Error deleting employee record:', response.statusText);
        }
      } catch (error) {
        alert('⚠️ ALERT!! ERROR DELETING YOUR DATA');
        console.error('Error deleting employee record:', error.message);
      }
    }
  };

  useEffect(() => {
    document.title = "Employee Details";
    
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/fetch');
        if (response.ok) {
          const data = await response.json();
          setEmployeeDataList(data);
        } else {
          console.error('Error fetching employee data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="employee-cards-page">
      <h1>Employee Details</h1>
      <div className="employee-cards-container">
        {employeeDataList.map((employeeData) => (
          <Card
            key={employeeData.empId}
            employeeData={employeeData}
            onEdit={() => editEmployeeData()}
            onDelete={(empId) => deleteEmployeeData(empId)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDetails;