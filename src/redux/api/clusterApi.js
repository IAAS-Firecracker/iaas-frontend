import apiClient from './apiClient';

const SERVICE_NAME = 'SERVICE-CLUSTER';
const CLUSTER_URI = 'api/service-clusters';

const clusterApi = {
  /**
   * Check cluster service health
   * @returns {Promise<Object>} - Health check response
   */
  getHealthCheck: () => {
    return apiClient.get(`/${SERVICE_NAME}/${CLUSTER_URI}/health`);
  },

  /**
   * Get cluster service info
   * @returns {Promise<Object>} - Service information
   */
  getInfo: () => {
    return apiClient.get(`/${SERVICE_NAME}/${CLUSTER_URI}/info`);
  },

  /**
   * Get all clusters
   * @returns {Promise<Array>} - Array of clusters
   */
  getClusters: () => {
    return apiClient.get(`/${SERVICE_NAME}/${CLUSTER_URI}/`);
  },

  /**
   * Get cluster by ID
   * @param {string|number} cluster_id - Cluster ID
   * @returns {Promise<Object>} - Cluster details
   */
  getClusterById: (cluster_id) => {
    return apiClient.get(`/${SERVICE_NAME}/${CLUSTER_URI}/${cluster_id}`);
  },

  /**
   * Get available clusters
   * @returns {Promise<Array>} - Array of available clusters
   */
  getAvailableClusters: () => {
    return apiClient.get(`/${SERVICE_NAME}/${CLUSTER_URI}/available`);
  },

  /**
   * Create new cluster
   * @param {Object} data - Cluster data
   * @param {string} data.nom - Cluster name
   * @param {string} data.adresse_mac - MAC address
   * @param {string} data.ip - IP address
   * @param {number} data.rom - Total ROM
   * @param {number} data.available_rom - Available ROM
   * @param {number} data.ram - Total RAM
   * @param {number} data.available_ram - Available RAM
   * @param {string} data.processeur - Processor type
   * @param {number} data.available_processor - Available processors
   * @param {number} data.number_of_core - Number of cores
   * @returns {Promise<Object>} - Created cluster data
   */
  createCluster: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/${CLUSTER_URI}/`, data);
  },

  /**
   * Update cluster
   * @param {string|number} cluster_id - Cluster ID
   * @param {Object} data - Updated cluster data
   * @returns {Promise<Object>} - Updated cluster data
   */
  updateCluster: (cluster_id, data) => {
    return apiClient.patch(`/${SERVICE_NAME}/${CLUSTER_URI}/${cluster_id}`, data);
  },

  /**
   * Delete cluster
   * @param {string|number} cluster_id - Cluster ID
   * @returns {Promise<Object>} - Deletion confirmation
   */
  deleteCluster: (cluster_id) => {
    return apiClient.delete(`/${SERVICE_NAME}/${CLUSTER_URI}/${cluster_id}`);
  },

  /**
   * Find suitable host for VM
   * @param {Object} data - VM requirements
   * @param {number} data.cpu_count - Required CPU cores
   * @param {number} data.memory_size_mib - Required memory in MiB
   * @param {number} data.disk_size_gb - Required disk space in GB
   * @param {string} data.name - VM name
   * @param {string} data.user_id - User ID
   * @param {string} data.os_type - OS type
   * @param {string} data.root_password - Root password
   * @param {string} data.vm_offer_id - VM offer ID
   * @param {string} data.system_image_id - System image ID
   * @returns {Promise<Object>} - Suitable host information
   */
  findSuitableHost: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/${CLUSTER_URI}/find-suitable-host`, {
      ...data,
      user_id: String(data.user_id),
      vm_offer_id: String(data.vm_offer_id),
      system_image_id: String(data.system_image_id)
    });
  }
};

export default clusterApi;