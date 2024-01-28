import React, { useEffect, useState } from "react";

import { getMyLeaves } from "../../services/LeaveService";
import {
  Box,
  Input,
  Text,
  Table,
  Thead,
  TabList,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
function MyLeaves() {
  const [id, setId] = useState();
  const [leaves, setLeaves] = useState();

  useEffect(() => {
    const companyLeaves = async () => {
      try {
        const res = await com(id);
        console.log(res);
        setLeaves(res);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);
  return (
    <Box minH={"100vh"} className="w-100vw" p={4}>
      <Box>
        <Text fontWeight={"600"} fontSize={"1.4rem"}>
          Company Leaves
        </Text>
        <Input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Leave Id"
          type="text"
          borderRadius={0}
        />
      </Box>
      <Box
        onClick={() => MyLeaves()}
        mt={4}
        shadow={"sm"}
        overflow={"scroll"}
        border={"1px solid lightgray"}
      >
        <Table minW={"max-content"} variant="simple">
          <Thead>
            <Tr>
              <Th>Candidate</Th>
              <Th>Email</Th>
              <Th>Job position</Th>
              <Th>Contact</Th>
              <Th>Stage</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaves?.map((candidate) =>
              (candidate.country === jobName &&
                // candidate.appliedToJobId === jobid
                candidate.currentRecruitmentStage == null) ||
              candidate.currentRecruitmentStage == "" ? (
                <Tr key={Math.random()}>
                  <Td>{candidate.applicantName} </Td>
                  <Td>{candidate.applicantEmail}</Td>
                  <Td>{candidate.country}</Td>
                  <Td>{candidate.mobileNumber}</Td>
                  <Td></Td>
                  <Td>
                    <MdOutlineMailOutline
                      onClick={() =>
                        handleSendMailClick(candidate.applicantEmail)
                      }
                      cursor={"pointer"}
                    />
                  </Td>
                </Tr>
              ) : (
                ""
              )
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default MyLeaves;
