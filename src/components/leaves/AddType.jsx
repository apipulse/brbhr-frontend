import { Box, Button, Toast } from "@chakra-ui/react";
import React from "react";
import { addLeaveType } from "../../services/LeaveService";

const AddType = () => {
  const { toast } = useToast();
  const addNewType = async () => {
    const [details, setDetails] = useState();

    try {
      const res = await addLeaveType();
      console.log(res);
      toast({
        title: 'Succes',
        description: 'Leave type has been added.',
        status: 'success', // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Error adding New Type.',
        status: 'error', // Options: 'info', 'warning', 'error', 'success'
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <form onSubmit={addNewType()}>
        <Button type="submit" borderRadius={0} colorScheme="red">Add</Button>
      </form>
    </Box>
  );
};

export default AddType;
