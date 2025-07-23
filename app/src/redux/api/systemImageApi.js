import apiClient from './apiClient';

const SERVICE_NAME = 'SERVICE-SYSTEM-IMAGE';
const IMAGE_URI = 'api/service-system-image';

const systemImageApi = {
  /**
   * Get all system images
   * @returns {Promise<Array>} - Array of system images
   */
  getSystemImages: () => {
    return apiClient.get(`/${SERVICE_NAME}/${IMAGE_URI}/`);
  },

  /**
   * Get a specific system image by ID
   * @param {string|number} id - System image ID
   * @returns {Promise<Object>} - System image details
   */
  getSystemImageById: (id) => {
    return apiClient.get(`/${SERVICE_NAME}/${IMAGE_URI}/${id}`);
  },

  /**
   * Create new system images
   * @param {FormData} data - System image data including file upload
   * @returns {Promise<Object>} - Created system image data
   */
  createSystemImages: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/${IMAGE_URI}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },

  /**
   * Update a system image
   * @param {string|number} id - System image ID
   * @param {Object} data - Updated system image data
   * @param {string} data.name - Image name
   * @param {string} data.os_type - OS type
   * @param {string} data.version - Version number
   * @param {string} data.description - Description
   * @param {File} [data.image] - Image file (optional)
   * @returns {Promise<Object>} - Updated system image data
   */
  updateSystemImages: (id, data) => {
    return apiClient.put(`/${SERVICE_NAME}/${IMAGE_URI}/${id}`, data);
  },

  /**
   * Delete a system image
   * @param {string|number} id - System image ID
   * @returns {Promise<Object>} - Deletion confirmation
   */
  deleteSystemImages: (id) => {
    return apiClient.delete(`/${SERVICE_NAME}/${IMAGE_URI}/${id}`);
  },

  /**
   * Search system images by name
   * @param {string} name - Search term
   * @returns {Promise<Array>} - Array of matching system images
   */
  searchSystemImages: (name) => {
    return apiClient.get(`/${SERVICE_NAME}/${IMAGE_URI}/search/${name}`);
  },

  /**
   * Get system images by OS type
   * @param {string} os_type - OS type to filter by
   * @returns {Promise<Array>} - Array of matching system images
   */
  getSystemImageByOsType: (os_type) => {
    return apiClient.get(`/${SERVICE_NAME}/${IMAGE_URI}/os-type/${os_type}`);
  },

  /**
   * Get service health status
   * @returns {Promise<Object>} - Health check response
   */
  getHealthCheck: () => {
    return apiClient.get(`/${SERVICE_NAME}/health`);
  }
};

export default systemImageApi;