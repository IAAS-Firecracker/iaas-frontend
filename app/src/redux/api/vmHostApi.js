import apiClient from './apiClient';

const SERVICE_NAME = 'SERVICE-VM-HOST';
const VM_URI = 'api/service-vm-host';

const vmHostApi = {
  /**
   * Get VM host service health status
   * @returns {Promise<Object>} - Health check response
   */
  getVmHostHealthCheck: () => {
    return apiClient.get(`/${SERVICE_NAME}/health`);
  },

  /**
   * Get VMs for a specific user
   * @param {string|number} userId - User ID
   * @returns {Promise<Array>} - Array of VMs
   */
  getVms: (userId) => {
    return apiClient.get(`/${SERVICE_NAME}/${VM_URI}/user/${userId}`);
  },

  /**
   * Create a new VM
   * @param {Object} data - VM configuration data
   * @param {string} data.name - VM name
   * @param {string} data.user_id - User ID
   * @param {string} data.service_cluster_id - Cluster ID
   * @param {number} data.cpu_count - CPU cores
   * @param {number} data.memory_size_mib - Memory in MiB
   * @param {number} data.disk_size_gb - Disk size in GB
   * @param {string} data.os_type - OS type
   * @param {string} [data.ssh_public_key] - SSH public key
   * @param {string} data.root_password - Root password
   * @param {string} [data.tap_device] - TAP device
   * @param {string} [data.tap_ip] - TAP IP
   * @param {string} [data.vm_ip] - VM IP
   * @param {string} [data.vm_mac] - VM MAC address
   * @param {string} data.vm_offer_id - VM offer ID
   * @param {string} data.system_image_id - System image ID
   * @returns {Promise<Object>} - Created VM data
   */
  createVm: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/${VM_URI}/vm/create`, {
      name: data.name,
      user_id: String(data.user_id),
      service_cluster_id: data.service_cluster_id,
      cpu_count: data.cpu_count,
      memory_size_mib: data.memory_size_mib,
      disk_size_gb: data.disk_size_gb,
      os_type: data.os_type,
      ssh_public_key: data.ssh_public_key,
      root_password: data.root_password,
      tap_device: data.tap_device,
      tap_ip: data.tap_ip,
      vm_ip: data.vm_ip,
      vm_mac: data.vm_mac,
      vm_offer_id: data.vm_offer_id,
      system_image_id: data.system_image_id
    });
  },

  /**
   * Start a VM
   * @param {Object} data - VM action data
   * @param {string} data.user_id - User ID
   * @param {string} data.vm_id - VM ID
   * @returns {Promise<Object>} - Action response
   */
  startVm: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/${VM_URI}/vm/start`, {
      user_id: String(data.user_id),
      vm_id: data.vm_id
    });
  },

  /**
   * Stop a VM
   * @param {Object} data - VM action data
   * @param {string} data.user_id - User ID
   * @param {string} data.vm_id - VM ID
   * @returns {Promise<Object>} - Action response
   */
  stopVm: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/${VM_URI}/vm/stop`, {
      user_id: String(data.user_id),
      vm_id: data.vm_id
    });
  },

  /**
   * Delete a VM
   * @param {Object} data - VM action data
   * @param {string} data.user_id - User ID
   * @param {string} data.vm_id - VM ID
   * @returns {Promise<Object>} - Action response
   */
  deleteVm: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/${VM_URI}/vm/delete`, {
      user_id: String(data.user_id),
      vm_id: data.vm_id
    });
  },

  /**
   * Get VM status
   * @param {Object} data - VM status data
   * @param {string} data.user_id - User ID
   * @param {string} data.vm_id - VM ID
   * @returns {Promise<Object>} - VM status
   */
  statusVm: (data) => {
    return apiClient.post(`/${SERVICE_NAME}/${VM_URI}/vm/status`, {
      user_id: String(data.user_id),
      vm_id: data.vm_id
    });
  },

  /**
   * Get VM metrics
   * @param {string|number} userId - User ID
   * @param {string} vmName - VM name
   * @returns {Promise<Object>} - VM metrics
   */
  getVmMetrics: (userId, vmName) => {
    return apiClient.get(`/${SERVICE_NAME}/${VM_URI}/vm/${userId}/${vmName}/metrics`);
  }
};

export default vmHostApi;