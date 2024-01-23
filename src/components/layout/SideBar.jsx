import React, { useState, useContext } from "react";
import {
  Box,
  Link,
  VStack,
  Collapse,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import NoteContext from "../../Context/NoteContext";
import { Link as RouterLink } from "react-router-dom";
import { BsGridFill } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsReceiptCutoff } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { color } from "framer-motion";
const SidebarLinkGroup = ({ title, children }) => {
  const abc = useContext(NoteContext);

  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Button
        variant="ghost"
        display={"flex"}
        gap={2}
        onClick={onToggle}
        width="100%"
        color={"white"}
        _active={{ bg: "rgb(36, 35, 35)" }}
        justifyContent="start"
        _hover={{ bg: "rgb(36, 35, 35)" }}
        border={"none"}
        outline={"none"}
        mb={2}
      >
        {title === "Recruitment" && (
          <>
            {" "}
            <BsReceiptCutoff /> {title}
          </>
        )}
        {title === "Employees" && (
          <>
            {" "}
            <MdOutlinePeopleAlt /> {title}
          </>
        )}
        {title === "Leaves" && (
          <>
            <ImCross /> {title}
          </>
        )}

        {title !== "Leaves" &&
          title !== "Employees" &&
          title !== "Recruitment" && <>{title}</>}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <VStack spacing={2} align="stretch" color={"lightgray"} pl={4}>
          {children}
        </VStack>
      </Collapse>
    </Box>
  );
};

const Sidebar = () => {
  const abc = useContext(NoteContext);
  return (
    <Box
      className="None"
      bg="rgb(48, 47, 50)"
      // position={'fixed'} top={0} left={0}
      h="100%"
      minHeight={"100vh"}
      w="200px"
      color="white"
    >
      <Box
        // to="/"
        borderBottom={"1px solid gray"}
        color={"white"}
        fontSize={"2rem"}
        textAlign={"center"}
        w={'100%'}
        pb={".5rem"}
      >
        <Link to='/'  _hover={{ color: "lightgray" }}>
        HRMS
        </Link>
      </Box>
      <VStack spacing={4} p={"1rem"} align="stretch">
        {/* Dashboard */}
        <Link
          display={"flex"}
          alignItems={"center"}
          gap={"2px"}
          pl={"15px"}
          as={RouterLink}
          to="/" 
          onClick={() => abc.setName("DASHBOARD")}
          _hover={{ color: "lightgray" }}
        >
          <BsGridFill /> Dashboard
        </Link>

        <SidebarLinkGroup color="white" title={"Recruitment"} padding="0">
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/job-posting"
          >
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
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/manage-offers"
          >
            Manage Offers
          </Link>
          {/* Additional Recruitment-related links */}
        </SidebarLinkGroup>

        {/* Employees */}
        <SidebarLinkGroup title="Employees">
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/employees">
            Employee List
          </Link>
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/add-employee"
          >
            Add Employee
          </Link>
          {/* Additional Employee-related links */}
        </SidebarLinkGroup>

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
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/leaves">
            Leave List
          </Link>
          <Link as={RouterLink} _hover={{ color: "lightgray" }} to="/add-leave">
            Apply for Leave
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
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/assets/manage"
          >
            Manage Assets
          </Link>
          <Link
            as={RouterLink}
            _hover={{ color: "lightgray" }}
            to="/assets/assign"
          >
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
