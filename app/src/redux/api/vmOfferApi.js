import apiClient from './apiClient';

const SERVICE_NAME = 'SERVICE-VM-OFFER/api';

const vmOfferApi = {
  /**
   * Get all VM offers
   * @returns {Promise<Array>} - Array of VM offers
   */
  getVmOffers: () => {
    return apiClient.get(`/${SERVICE_NAME}/vm-offers/`);
  },

  /**
   * Create new VM offer
   * @param {Object} data - VM offer data
   * @param {string} data.name - Offer name
   * @param {string} data.description - Offer description
   * @param {number} data.cpu_count - Number of CPUs
   * @param {number} data.memory_size_mib - Memory size in MiB
   * @param {number} data.disk_size_gb - Disk size in GB
   * @param {number} data.price_per_hour - Price per hour
   * @returns {Promise<Object>} - Created VM offer
   */
  createVmOffer: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/vm-offers/`, {
      name: data.name,
      description: data.description,
      cpu_count: data.cpu_count,
      memory_size_mib: data.memory_size_mib,
      disk_size_gb: data.disk_size_gb,
      price_per_hour: data.price_per_hour
    });
  },

  /**
   * Get VM offer by ID
   * @param {string|number} vm_offer_id - VM offer ID
   * @returns {Promise<Object>} - VM offer details
   */
  getVmOfferById: (vm_offer_id) => {
    return apiClient.get(`/${SERVICE_NAME}/vm-offers/${vm_offer_id}`);
  },

  /**
   * Delete VM offer
   * @param {string|number} vm_offer_id - VM offer ID
   * @returns {Promise<Object>} - Deletion confirmation
   */
  deleteVmOffer: (vm_offer_id) => {
    return apiClient.delete(`/${SERVICE_NAME}/vm-offers/${vm_offer_id}`);
  },

  /**
   * Update VM offer
   * @param {string|number} vm_offer_id - VM offer ID
   * @param {Object} data - Updated VM offer data
   * @returns {Promise<Object>} - Updated VM offer
   */
  updateVmOffer: (vm_offer_id, data) => {
    return apiClient.put(`/${SERVICE_NAME}/vm-offers/${vm_offer_id}`, {
      name: data.name,
      description: data.description,
      cpu_count: data.cpu_count,
      memory_size_mib: data.memory_size_mib,
      disk_size_mib: data.disk_size_mib,
      price_per_hour: data.price_per_hour
    });
  },

  /**
   * Search VM offers by name
   * @param {string} name - Search term
   * @returns {Promise<Array>} - Matching VM offers
   */
  searchVmOffer: (name) => {
    return apiClient.post(`/${SERVICE_NAME}/vm-offers/search/${name}`);
  },

  /**
   * Get active VM offers
   * @returns {Promise<Array>} - Array of active VM offers
   */
  getActiveVmOffers: () => {
    return apiClient.get(`/${SERVICE_NAME}/vm-offers/active`);
  },

  /**
   * Get VM offer service health status
   * @returns {Promise<Object>} - Health check response
   */
  getVmOfferHealthCheck: () => {
    return apiClient.get(`/${SERVICE_NAME}/service-vm-offer/health`);
  }
};

export default vmOfferApi;