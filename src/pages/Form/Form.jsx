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

  useEffect(() => {
    document.title = "Handle Employee Data";
    console.log("PAGE STARTED");
    console.log(empId);
  
    if (empId && empId !== ":") {
      const fetchData = async () => {
        try {
          const response = await fetch(`/.netlify/functions/fetchOne/${encodeURIComponent(empId)}`);
          if (response.ok) {
            const data = await response.json();
            setFormData(data);
          } else {
            console.error('Error fetching employee data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching employee data:', error.message);
        }
      };
      fetchData();
    }
  }, [empId]);

  return (
    <div className="form-container">
      <h1>Employee Profile Form</h1>
      <h4>Fields marked with asterisk(*) are compulsory</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="empId">Employee ID*</label>
        <input onChange={handleChange} type="number" id="empId" name="empId" value={formData.empId} required />

        <label htmlFor="firstName">First Name*</label>
        <input onChange={handleChange} type="text" id="firstname" name="firstname" value={formData.firstName} required />

        <label htmlFor="lastName">Last Name*</label>
        <input onChange={handleChange} type="text" id="lastname" name="lastname" value={formData.lastName} required />

        <label htmlFor="department">Department*</label>
        <input onChange={handleChange} type="text" id="department" name="department" value={formData.department} required />

        <label htmlFor="position">Position*</label>
        <input onChange={handleChange} type="text" id="position" name="position" value={formData.position} required />

        <label htmlFor="email">Email*</label>
        <input onChange={handleChange} type="email" id="email" name="email" value={formData.email} required />

        <label htmlFor="gender">Gender</label>
        <select onChange={handleChange} value={formData.gender} id="gender" name="gender">
          <option value="Select">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>

        <label htmlFor="age">Age</label>
        <input onChange={handleChange} type="number" id="age" name="age" value={formData.age} />

        <label htmlFor="salary">Salary</label>
        <input onChange={handleChange} type="number" id="salary" name="salary" value={formData.salary} />

        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default Form;