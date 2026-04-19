const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  return data;
};

const fetchJson = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Cannot connect to the backend. Make sure Docker Desktop, PostgreSQL, and the backend server are running.');
    }

    throw error;
  }
};

export const createActivity = async (activityData) => {
  return fetchJson(`${API_BASE_URL}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activityData)
  });
};

export const fetchActivities = async () => {
  return fetchJson(`${API_BASE_URL}/activities`);
};

export const fetchAnalytics = async () => {
  return fetchJson(`${API_BASE_URL}/analytics`);
};

export const deleteActivity = async (id) => {
  return fetchJson(`${API_BASE_URL}/activities/${id}`, {
    method: 'DELETE'
  });
};
