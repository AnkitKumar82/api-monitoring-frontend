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

// Workspace API Service
export const workspaceApi = {
  // Get Current Workspace
  getCurrentWorkspace: async (token) => {
    const response = await fetch(`${ServerEndpoint}/workspaces/current`, {
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
  },

  // Get Workspaces
  getWorkspaces: async (token) => {
    const response = await fetch(`${ServerEndpoint}/workspaces`, {
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
  },

  // Create Workspace
  createWorkspace: async (token, workspaceData) => {
    return apiRequest('/workspaces', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: workspaceData,
    });
  },

  // Update Workspace
  updateWorkspace: async (token, workspaceData) => {
    return apiRequest('/workspaces', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: workspaceData,
    });
  },
};