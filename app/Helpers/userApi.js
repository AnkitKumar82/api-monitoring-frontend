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

// User API Service
export const userApi = {
  // Signup Initiate
  signupInitiate: async (email) => {
    return apiRequest('/user/signup-initiate', {
      body: { email },
    });
  },

  // Signup Complete
  signupComplete: async (userData) => {
    return apiRequest('/user/signup-complete', {
      body: userData,
    });
  },

  // Signin
  signin: async (email, password) => {
    return apiRequest('/user/signin', {
      body: { email, password },
    });
  },

  // Forgot Password Initiate
  forgotPasswordInitiate: async (email) => {
    return apiRequest('/user/forgot-password-initiate', {
      body: { email },
    });
  },

  // Forgot Password Complete
  forgotPasswordComplete: async (data) => {
    return apiRequest('/user/forgot-password-complete', {
      body: data,
    });
  },

  // Get Profile
  getProfile: async (token) => {
    const response = await fetch(`${ServerEndpoint}/user/get-profile`, {
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

  // Contact Us
  contactUs: async (contactData) => {
    return apiRequest('/user/contact-us', {
      body: contactData,
    });
  },
};