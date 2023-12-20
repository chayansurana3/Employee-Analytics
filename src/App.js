import React from "react";
import Navbar from "./components/Header/NavBar";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import EmployeeDetails from "./pages/Cards/EmployeeDetails";
import EmployeeList from "./pages/List/List";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/form:empId" element={<Form />} />
        <Route path="/list" element={<EmployeeList />} />   
        <Route path="/details" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;