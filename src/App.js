import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Header/NavBar";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import EmployeeDetails from "./pages/Cards/EmployeeDetails";
import EmployeeList from "./pages/List/List";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggleButton/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <ThemeToggle />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/form/:empId" element={<Form />} />
          <Route path="/list" element={<EmployeeList />} />
          <Route path="/details" element={<EmployeeDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
