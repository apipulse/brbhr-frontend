import React, { useState } from 'react';
import { Box, Link, VStack, Collapse, Button, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SidebarLinkGroup = ({ title, children }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Button variant="ghost" onClick={onToggle} width="100%" justifyContent="flex-start">
        {title}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <VStack spacing={2} align="stretch" pl={4}>
          {children}
        </VStack>
      </Collapse>
    </Box>
  );
};

const Sidebar = () => {
  return (
    <Box bg="blue.500" h="100vh" w="250px" color="white" p="4">
      <VStack spacing={4} align="stretch">
        {/* Dashboard */}
        <Link as={RouterLink} to="/dashboard">Dashboard</Link>

        {/* Employees */}
        <SidebarLinkGroup title="Employees">
          <Link as={RouterLink} to="/employees/list">Employee List</Link>
          <Link as={RouterLink} to="/employees/add">Add Employee</Link>
          {/* Additional Employee-related links */}
        </SidebarLinkGroup>

        {/* Attendance */}
        <SidebarLinkGroup title="Attendance">
          <Link as={RouterLink} to="/attendance/records">Attendance Records</Link>
          <Link as={RouterLink} to="/attendance/report">Attendance Report</Link>
          {/* Additional Attendance-related links */}
        </SidebarLinkGroup>

        {/* Leaves */}
        <SidebarLinkGroup title="Leaves">
          <Link as={RouterLink} to="/leaves/apply">Apply for Leave</Link>
          <Link as={RouterLink} to="/leaves/status">Leave Status</Link>
          {/* Additional Leaves-related links */}
        </SidebarLinkGroup>

        {/* Payroll */}
        <SidebarLinkGroup title="Payroll">
          <Link as={RouterLink} to="/payroll/salary">Salary Details</Link>
          <Link as={RouterLink} to="/payroll/statements">Payroll Statements</Link>
          {/* Additional Payroll-related links */}
        </SidebarLinkGroup>

        {/* Assets */}
        <SidebarLinkGroup title="Assets">
          <Link as={RouterLink} to="/assets/manage">Manage Assets</Link>
          <Link as={RouterLink} to="/assets/assign">Assign Assets</Link>
          {/* Additional Asset-related links */}
        </SidebarLinkGroup>

        {/* Performance (PMS) */}
        <SidebarLinkGroup title="Performance">
          <Link as={RouterLink} to="/performance/reviews">Performance Reviews</Link>
          <Link as={RouterLink} to="/performance/goals">Set Goals</Link>
          {/* Additional Performance-related links */}
        </SidebarLinkGroup>

        {/* Additional main categories as needed */}
      </VStack>
    </Box>
  );
};

export default Sidebar;
