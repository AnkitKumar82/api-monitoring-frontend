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

// Incident API Service
export const incidentApi = {
  // List incidents with optional filtering and pagination
  listIncidents: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiGetRequest(`/incidents?${queryString}`, token);
  },

  // Get incident details by ID
  getIncidentDetails: async (token, id) => {
    return apiGetRequest(`/incidents/${id}`, token);
  },

  // Get incident timeline by ID
  getIncidentTimeline: async (token, id) => {
    return apiGetRequest(`/incidents/${id}/timeline`, token);
  },

  // Acknowledge an incident
  acknowledgeIncident: async (token, id, acknowledged) => {
    return apiPutRequest(`/incidents/${id}/acknowledge`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: { acknowledged },
    });
  },

  // Get incident statistics
  getIncidentStats: async (token) => {
    return apiGetRequest('/incidents/stats', token);
  },

  // Create a new incident (if needed)
  createIncident: async (token, incidentData) => {
    return apiRequest('/incidents', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: incidentData,
    });
  },

  // Update an incident (if needed)
  updateIncident: async (token, id, incidentData) => {
    return apiPutRequest(`/incidents/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: incidentData,
    });
  },

  // Delete an incident (if needed)
  deleteIncident: async (token, id) => {
    return apiDeleteRequest(`/incidents/${id}`, token);
  },
};

// Export the API client for direct use if needed
export default incidentApi;