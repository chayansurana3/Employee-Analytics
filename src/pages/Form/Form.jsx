import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./form.css";
import Swal from 'sweetalert2';

function Form() {
  const [formData, setFormData] = useState({
    empId: "",
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "Select",
    position: "",
    salary: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const { empId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isNaN(formData.age)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid age!"
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Data submitted successfully!",
          icon: "success"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ERROR IN STORING YOUR DATA!"
        });
        console.error('Error submitting data:', response.statusText);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR IN STORING YOUR DATA!"
      });
      console.error('Error submitting data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const setAllFields = () => {
    const empIdInput = document.getElementById('empId');
    const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
    const departmentInput = document.getElementById('department');
    const positionInput = document.getElementById('position');
    const emailInput = document.getElementById('email');
    const genderInput = document.getElementById('gender');
    const ageInput = document.getElementById('age');
    const salaryInput = document.getElementById('salary');

    empIdInput.value = formData.empId;
    firstnameInput.value = formData.firstName;
    lastnameInput.value = formData.lastName;
    departmentInput.value = formData.department;
    positionInput.value = formData.position;
    emailInput.value = formData.email;
    genderInput.value = formData.gender;
    ageInput.value = formData.age;
    salaryInput.value = formData.salary;
  };

  const resetAllFields = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reset data!"
    }).then((result) => {
      if (result.isConfirmed) {
        const empIdInput = document.getElementById('empId');
        const firstnameInput = document.getElementById('firstname');
        const lastnameInput = document.getElementById('lastname');
        const departmentInput = document.getElementById('department');
        const positionInput = document.getElementById('position');
        const emailInput = document.getElementById('email');
        const genderInput = document.getElementById('gender');
        const ageInput = document.getElementById('age');
        const salaryInput = document.getElementById('salary');
    
        empIdInput.value = '';
        firstnameInput.value = '';
        lastnameInput.value = '';
        departmentInput.value = '';
        positionInput.value = '';
        emailInput.value = '';
        genderInput.value = '';
        ageInput.value = '';
        salaryInput.value = '';
      } 
      else return;
    })
  };

  useEffect(() => {
    document.title = "Handle Employee Data";
    console.log("PAGE STARTED");
    console.log(empId);

    if (empId && empId !== ":") {
      const fetchData = async () => {
        try {
          const response = await fetch(`/.netlify/functions/fetchOne/${encodeURIComponent(empId)}`);
          if (response === 'ok') {
            const data = await response.json();
            console.log(data);
            setFormData(prevData => {
              let updatedData = { ...prevData };
              for (const key in data) {
                if (!Object.prototype.hasOwnProperty.call(updatedData, key)) continue;
                updatedData[key] = data[key];
              }
              return updatedData;
            });
            console.log(formData);
            setAllFields();
          } else {
            console.error('Error fetching employee data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching employee data:', error.message);
        }
      };
      fetchData();
    }
  }, [empId, formData, setFormData, setAllFields]);

  return (
    <div className="form-container">
      <h1>Employee Profile Form</h1>
      <h4>Fields marked with asterisk(*) are compulsory</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="empId">Employee ID*</label>
        <input onChange={handleChange} type="number" id="empId" name="empId" required />

        <label htmlFor="firstName">First Name*</label>
        <input onChange={handleChange} type="text" id="firstname" name="firstname" required />

        <label htmlFor="lastName">Last Name*</label>
        <input onChange={handleChange} type="text" id="lastname" name="lastname" required />

        <label htmlFor="department">Department*</label>
        <input onChange={handleChange} type="text" id="department" name="department" required />

        <label htmlFor="position">Position*</label>
        <input onChange={handleChange} type="text" id="position" name="position" required />

        <label htmlFor="email">Email*</label>
        <input onChange={handleChange} type="email" id="email" name="email" required />

        <label htmlFor="gender">Gender</label>
        <select onChange={handleChange} value={formData.gender} id="gender" name="gender">
          <option value="Select">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>

        <label htmlFor="age">Age</label>
        <input onChange={handleChange} type="number" id="age" name="age" />

        <label htmlFor="salary">Salary</label>
        <input onChange={handleChange} type="number" id="salary" name="salary" />

        <div className="button-container">
          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          <button type="button" onClick={resetAllFields}>Reset</button>
        </div>
        
      </form>
    </div>
  );
}

export default Form;