import { api } from './api';

// Get all notification channels
export const fetchNotificationChannels = async () => {
  try {
    const response = await api.get('/notification-channels');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch notification channels');
  }
};

// Get a specific notification channel
export const fetchNotificationChannel = async (id) => {
  try {
    const response = await api.get(`/notification-channels/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch notification channel');
  }
};

// Create a new notification channel
export const createNotificationChannel = async (channelData) => {
  try {
    const response = await api.post('/notification-channels', channelData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create notification channel');
  }
};

// Update a notification channel
export const updateNotificationChannel = async (id, channelData) => {
  try {
    const response = await api.put(`/notification-channels/${id}`, channelData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update notification channel');
  }
};

// Delete a notification channel
export const deleteNotificationChannel = async (id) => {
  try {
    const response = await api.delete(`/notification-channels/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete notification channel');
  }
};