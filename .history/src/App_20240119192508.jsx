import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import SideBar from './components/layout/SideBar';
import Home from './components/pages/Home';
import EmployeeList from './components/employee/EmployeeList';
import AddEmployee from './components/employee/AddEmployee';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
