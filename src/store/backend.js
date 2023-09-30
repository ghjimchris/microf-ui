import axios from 'axios';

// Define the URL of your Java backend API
const backendApiUrl = 'http://your-backend-api-url.com'; // Replace with your actual URL

// Function to fetch data from the Java backend
const fetchDataFromBackend = async () => {
  try {
    const response = await axios.get(`${backendApiUrl}/your-endpoint`);
    return response.data; // Assuming your data is returned as JSON
  } catch (error) {
    console.error('Error fetching data from the backend:', error);
    throw error;
  }
};

export default fetchDataFromBackend;
