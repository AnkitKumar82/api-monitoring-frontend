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

// Team API Service
export const teamApi = {
  // Create Team
  createTeam: async (teamData, token) => {
    return apiRequest('/team', {
      body: teamData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // Get Team
  getTeam: async (teamId, token) => {
    const response = await fetch(`${ServerEndpoint}/team/${teamId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // Update Team
  updateTeam: async (teamId, teamData, token) => {
    const response = await fetch(`${ServerEndpoint}/team/${teamId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(teamData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // Delete Team
  deleteTeam: async (teamId, token) => {
    const response = await fetch(`${ServerEndpoint}/team/${teamId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response;
  },

  // Get All Teams
  getAllTeams: async (token) => {
    const response = await fetch(`${ServerEndpoint}/team`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
};