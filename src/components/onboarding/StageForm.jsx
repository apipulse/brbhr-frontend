import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { createOnboardingStage } from "../../services/onboardingService";
const StageForm = ({ jobPostingId, onStageAdded }) => {
  const [stage, setStage] = useState({
    name: "",
    description: "", 
    defaultManager: "",
    candidateIdVsManager: {}
  });
  console.log(jobPostingId);

  const handleChange = (e) => {
    setStage({ ...stage, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const index = 104;
    e.preventDefault();
    try {
      await createOnboardingStage(stage, jobPostingId, index);
      console.log("Stage added to job posting.", jobPostingId, stage);
      onStageAdded(); // Callback to refresh the list or update UI
    } catch (error) {
      console.error("Error adding stage:", error);
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        {/* Form fields for stage details */}
        <FormControl id="name" isRequired>
          <FormLabel>Stage</FormLabel>
          <Input borderRadius={0} name="name" type="text" onChange={handleChange} />
        </FormControl>
        <FormControl id="description" mt={4}>
          <FormLabel>Description</FormLabel>
          <Input borderRadius={0} name="description" type="text" onChange={handleChange} />
        </FormControl>
        <FormControl id="description" mt={4}>
          <FormLabel>Manager</FormLabel>
          <Input borderRadius={0} name="defaultManager" type="text" onChange={handleChange} />
        </FormControl>
        {/* <FormControl id="roundNumber" mt={4}>
          <FormLabel>Round Number</FormLabel>
          <Input
            name="roundNumber"
            type="number"
            min={1}
            onChange={handleChange}
          />
        </FormControl> */}
        <Button mt={4} colorScheme="red" borderRadius={0} type="submit">
          Add Stage
        </Button>
      </form>
    </Box>
  );
};

export default StageForm;
