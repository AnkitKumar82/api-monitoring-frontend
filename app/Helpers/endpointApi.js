import ServerConfig from '../Config/ServerConfig';

const { ServerEndpoint } = ServerConfig

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${ServerEndpoint}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(options.body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// Helper function to handle GET requests
const apiGetRequest = async (endpoint, token) => {
  const url = `${ServerEndpoint}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// Helper function to handle PUT requests
const apiPutRequest = async (endpoint, options = {}) => {
  const url = `${ServerEndpoint}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(options.body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// Helper function to handle DELETE requests
const apiDeleteRequest = async (endpoint, token) => {
  const url = `${ServerEndpoint}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// Endpoint API Service
export const endpointApi = {
  // Create Endpoint
  createEndpoint: async (token, endpointData) => {
    return apiRequest('/endpoints', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: endpointData,
    });
  },

  // Get Endpoint
  getEndpoint: async (token, endpointId) => {
    return apiGetRequest(`/endpoints/${endpointId}`, token);
  },

  // Update Endpoint
  updateEndpoint: async (token, endpointId, endpointData) => {
    return apiPutRequest(`/endpoints/${endpointId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: endpointData,
    });
  },

  // Delete Endpoint
  deleteEndpoint: async (token, endpointId) => {
    return apiDeleteRequest(`/endpoints/${endpointId}`, token);
  },

  // Get All Endpoints
  getAllEndpoints: async (token) => {
    return apiGetRequest('/endpoints', token);
  },

  // Test Endpoint
  testEndpoint: async (token, endpointData) => {
    return apiRequest('/endpoints/test', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: endpointData,
    });
  },
};