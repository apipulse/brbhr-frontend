import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import SideBar from './components/layout/SideBar';
import Home from './components/pages/Home';
import EmployeeList from './components/employee/EmployeeList';
import AddEmployee from './components/employee/AddEmployee';
import LeaveList from './components/employee/LeaveList';
import LeaveForm from './components/employee/LeaveForm';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <SideBar/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/leaves" element={<EmployeeList />} />
          <Route path="/add-leave" element={<AddEmployee />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
