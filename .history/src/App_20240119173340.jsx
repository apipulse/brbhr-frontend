import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home.jsx';
import EmployeeList from './employee/EmployeeList.jsx';
import AddEmployee from './employee/AddEmployee.jsx';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/employees" component={EmployeeList} />
          <Route path="/add-employee" component={AddEmployee} />
          {/* Add more routes as needed */}
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
