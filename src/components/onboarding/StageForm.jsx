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

  // const onboardingStage = new OnboardingStage(
  //   'Initial Stage',
  //   'Description of the stage',
  //   'Manager1',
  //   { 'candidate1': 'Manager2', 'candidate2': 'Manager3' }
  //   );

  const handleSubmit = async (e) => {
    const index = 2;
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
          <Input name="name" type="text" onChange={handleChange} />
        </FormControl>
        <FormControl id="description" mt={4}>
          <FormLabel>Description</FormLabel>
          <Input name="description" type="text" onChange={handleChange} />
        </FormControl>
        <FormControl id="description" mt={4}>
          <FormLabel>Manager</FormLabel>
          <Input name="defaultManager" type="text" onChange={handleChange} />
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
