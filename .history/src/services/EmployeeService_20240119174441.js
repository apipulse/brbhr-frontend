import axios from './axiosInstance';

export const getEmployees = async () => {
    try {
        const response = await axios.get('employees');
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const response = await axios.get(`employees/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee:', error);
        throw error;
    }
};

To complete the `EmployeeService.js` file with the remaining CRUD operations (Create, Update, Delete) that correspond to your `EmployeeController` in the backend, you can add the following methods:

### EmployeeService.js

```javascript
import axios from './axiosInstance';

export const getEmployees = async () => {
    // existing code...
};

export const getEmployeeById = async (id) => {
    // existing code...
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post('employees', employeeData);
        return response.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await axios.put(`employees/${id}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        await axios.delete(`employees/${id}`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};
```

### Explanation:

- **createEmployee**: Sends a POST request to create a new employee. The `employeeData` parameter should be an object containing the new employee's information.
- **updateEmployee**: Sends a PUT request to update an existing employee. It requires the `id` of the employee to update and `employeeData` containing the updated information.
- **deleteEmployee**: Sends a DELETE request to remove an employee by their `id`.

Each of these functions handles the respective HTTP requests to your backend and returns the response data. In case of errors, they log the error and rethrow it, allowing the calling component to handle it as needed (e.g., showing error messages to the user).

When you integrate these services into your React components, you can use them to perform the desired actions (like adding a new employee, updating an employee's details, or deleting an employee) based on user interactions. Remember to manage state and UI feedback appropriately to reflect these operations (e.g., refreshing the employee list after a new employee is added).

