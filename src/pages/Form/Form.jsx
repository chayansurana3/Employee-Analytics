import React, { useState, useEffect } from "react";
import "./form.css";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isNaN(formData.age)) {
      alert('⚠️ ALERT!! Please enter a valid age.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('✅✅Data submitted successfully!');
      } else {
        alert('⚠️ ALERT!! ERROR IN STORING YOUR DATA');
        console.error('Error submitting data:', response.statusText);
      }
    } catch (error) {
        alert('⚠️ ALERT!! ERROR IN STORING YOUR DATA');
        console.error('Error submitting data:', error.message);
    }
  };

  useEffect(() => {
    document.title = "Handle Employee Data"
  }, []);

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;