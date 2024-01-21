import React, { useState } from "react";
import {
  Box,
  Link,
  VStack,
  Collapse,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BsGridFill } from "react-icons/bs";
import { color } from "framer-motion";
const SidebarLinkGroup = ({ title, children }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Button
        variant="ghost"
        onClick={onToggle}
        width="100%"
        justifyContent="flex-start"
      >
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
    <Box
      bg="green.500"
      // position={'fixed'} top={0} left={0}
      h="100%"
      minHeight={"100vh"}
      w="250px"
      color="white"
      p="4"
    >
      <Box borderBottom={"1px"} fontSize={"2rem"} textAlign={"center"}>
        Logo
      </Box>
      <VStack spacing={4} py={"1rem"} align="stretch">
        {/* Dashboard */}
        <Link
          display={"flex"}
          alignItems={"center"}
          gap={"2px"}
          as={RouterLink}
          to="/"
          _hover={{color:'lightgray'}}
        >
          <BsGridFill /> Dashboard
        </Link>

        <SidebarLinkGroup title="Recruitment">
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/job-posting">
            Post Job
          </Link>
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/job-posting-list"
          >
            job-posting-list
          </Link>
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/all-application"
          >
            Job Applications
          </Link>
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/apply-job">
            Apply Job
          </Link>
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/schedule-interview"
          >
            Schedule Interview
          </Link>
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/manage-offers">
            Manage Offers
          </Link>
          {/* Additional Recruitment-related links */}
        </SidebarLinkGroup>

        {/* Employees */}
        <SidebarLinkGroup title="Employees">
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/employees"
          >
            Employee List
          </Link>
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/add-employee">
            Add Employee
          </Link>
          {/* Additional Employee-related links */}
        </SidebarLinkGroup>

        {/* Attendance */}
        <SidebarLinkGroup title="Attendance">
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/AttendanceDetails"
          >
            Attendance Records
          </Link>
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/AttendanceDetails"
          >
            Attendance Report
          </Link>
          {/* Additional Attendance-related links */}
        </SidebarLinkGroup>

        {/* Leaves */}
        <SidebarLinkGroup title="Leaves">
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/leaves/apply">
            Apply for Leave
          </Link>
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/leaves/status">
            Leave Status
          </Link>
          {/* Additional Leaves-related links */}
        </SidebarLinkGroup>

        {/* Payroll */}
        <SidebarLinkGroup title="Payroll">
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/payroll/salary"
          >
            Salary Details
          </Link>
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/payroll/statements"
          >
            Payroll Statements
          </Link>
          {/* Additional Payroll-related links */}
        </SidebarLinkGroup>

        {/* Assets */}
        <SidebarLinkGroup title="Assets">
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/assets/manage">
            Manage Assets
          </Link>
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/assets/assign">
            Assign Assets
          </Link>
          {/* Additional Asset-related links */}
        </SidebarLinkGroup>

        {/* Performance (PMS) */}
        <SidebarLinkGroup title="Performance">
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/performance/reviews"
          >
            Performance Reviews
          </Link>
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/performance/goals"
          >
            Set Goals
          </Link>
          {/* Additional Performance-related links */}
        </SidebarLinkGroup>

        {/* Additional main categories as needed */}
      </VStack>
    </Box>
  );
};

export default Sidebar;
