import apiClient from './apiClient';

const SERVICE_NAME = 'USER-SERVICE/api/auth';
const REFRESH_TOKEN_URL = 'USER-SERVICE/api/token';

const userApi = {
  /**
   * Login a user
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - Email
   * @param {string} credentials.password - Password
   * @returns {Promise} - The API response
   */
  login: (credentials) => {
    return apiClient.post(`/${SERVICE_NAME}/login/`, credentials);
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - Username
   * @param {string} userData.email - Email
   * @param {string} userData.password - Password
   * @param {string} userData.confirmPassword - Confirm Password
   * @returns {Promise} - The API response
   */
  register: (userData) => {
    return apiClient.post(`/${SERVICE_NAME}/register/`, userData);
  },

  /**
   * Create admin user
   * @param {Object} userData - Admin registration data
   * @param {string} userData.name - Username
   * @param {string} userData.email - Email
   * @param {string} userData.password - Password
   * @param {string} userData.confirm_password - Confirm Password
   * @returns {Promise} - The API response
   */
  createAdmin: (userData) => {
    return apiClient.post(`/${SERVICE_NAME}/admins/`, userData);
  },

  /**
   * Get all users
   * @returns {Promise} - The API response
   */
  getUsers: () => {
    return apiClient.get(`/${SERVICE_NAME}/users/`);
  },

  /**
   * Get user by ID
   * @param {string|number} id - User ID
   * @returns {Promise} - The API response
   */
  getUserById: (id) => {
    return apiClient.get(`/${SERVICE_NAME}/users/${id}/`);
  },

  /**
   * Get logged in user
   * @param {number} id - User ID
   * @returns {Promise} - The API response
   */
  getLoggedInUser: (id) => {
    return apiClient.get(`/${SERVICE_NAME}/users/${id}/`);
  },

  /**
   * Update user
   * @param {string|number} userId - User ID
   * @param {Object} data - User data
   * @param {string} data.name - Username
   * @param {string} data.email - Email
   * @param {string} data.role - Role
   * @param {string} data.status - Status
   * @returns {Promise} - The API response
   */
  updateUser: (userId, data) => {
    return apiClient.patch(`/${SERVICE_NAME}/users/${userId}/`, data);
  },

  /**
   * Delete user
   * @param {string|number} userId - User ID
   * @returns {Promise} - The API response
   */
  deleteUser: (userId) => {
    return apiClient.delete(`/${SERVICE_NAME}/users/${userId}/`);
  },

  /**
   * Update profile
   * @param {number} id - User id
   * @param {Object} data - Profile data
   * @param {string} data.name - Username
   * @param {string} data.email - Email
   * @returns {Promise} - The API response
   */
  updateProfile: (data, id) => {
    return apiClient.patch(`/${SERVICE_NAME}/users/${id}/`, data);
  },

  /**
   * Delete profile
   * @param {number} id - User id
   * @returns {Promise} - The API response
   */
  deleteProfile: (id) => {
    return apiClient.delete(`/${SERVICE_NAME}/users/${id}/`);
  },

  /**
   * Change user password
   * @param {Object} data - Password data
   * @param {string} data.password - Current password
   * @param {string} data.newPassword - New password
   * @returns {Promise} - The API response
   */
  changeUserPassword: (data) => {
    return apiClient.patch(`/${SERVICE_NAME}/users/change-password/`, data);
  },

  /**
   * Send password reset code
   * @param {Object} data - Email data
   * @param {string} data.email - Email address
   * @returns {Promise} - The API response
   */
  sendResetCode: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/users/send-reset-code/`, data);
  },

  /**
   * Verify reset code
   * @param {Object} data - Verification data
   * @param {string} data.email - Email address
   * @param {string} data.code - Verification code
   * @returns {Promise} - The API response
   */
  verifyResetCode: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/users/verify-code/`, data);
  },

  /**
   * Reset user password
   * @param {Object} data - Password reset data
   * @param {string} data.email - Email address
   * @param {string} data.code - Verification code
   * @param {string} data.newPassword - New password
   * @returns {Promise} - The API response
   */
  resetUserPassword: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/users/reset-password/`, data);
  },

  /**
   * Refresh JWT token
   * @param {Object} data - Refresh token data
   * @param {string} data.refreshToken - Refresh token
   * @returns {Promise} - The API response with new access token
   */
  refreshToken: (data) => {
    return apiClient.post(`/${REFRESH_TOKEN_URL}/refresh/`, data);
  }
};

export default userApi;