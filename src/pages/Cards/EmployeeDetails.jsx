import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Cards/Card';
import './employeeCards.css';
import Swal from 'sweetalert2';

function EmployeeDetails() {
  const [employeeDataList, setEmployeeDataList] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Employee Details";
    let currTheme = localStorage.getItem("theme") || "light";
    setTheme(currTheme);
    
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/fetch');
        if (response.ok) {
          const data = await response.json();
          const sortedData = data.sort((a, b) => a.empId - b.empId);
          setEmployeeDataList(sortedData);
        } else {
          console.error('Error fetching employee data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };
  
    fetchData();
  }, []);

  const editEmployeeData = (empId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/form/${encodeURIComponent(empId)}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ERROR IN EDITING YOUR DATA!"
        });
        console.error('Error editing employee record:', result.statusText);
      }
    })
  };

  const deleteEmployeeData = async (empId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeleting(true);
        try {
          console.log(empId);
          const response = await fetch(`/.netlify/functions/delete/${encodeURIComponent(empId)}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            const updatedEmployeeList = employeeDataList.filter((employee) => employee.empId !== empId);
            setEmployeeDataList(updatedEmployeeList);
            Swal.fire({
              title: "Success!",
              text: "Data deleted successfully!",
              icon: "success"
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "ERROR IN DELETING YOUR DATA!"
            });
            console.error('Error deleting employee record:', response.statusText);
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "ERROR IN DELETING YOUR DATA!"
          });
          console.error('Error deleting employee record:', error.message);
        }
        finally {
          setDeleting(false);
        }
      }
    });
  };
  
  return (
    <div className="employee-cards-page">
      <h1 className={theme === "dark" ? "h1-dark" : null}>Employee Details</h1>
      <div className={theme === "light" ? "employee-cards-container" : "employee-cards-container-dark"}>
        {employeeDataList.map((employeeData) => (
          <Card
            key={employeeData.empId}
            employeeData={employeeData}
            onEdit={() => editEmployeeData(employeeData.empId)}
            onDelete={() => deleteEmployeeData(employeeData.empId)}
            deleting={deleting}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeDetails;