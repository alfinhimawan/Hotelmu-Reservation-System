const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/user/auth`,
  USER: `${API_BASE_URL}/user`,
  KAMAR: `${API_BASE_URL}/kamar`,
  TIPE_KAMAR: `${API_BASE_URL}/tipe_kamar`,
  PEMESANAN: `${API_BASE_URL}/pemesanan`,
  DETAIL_PEMESANAN: `${API_BASE_URL}/detail_pemesanan`,
  CUSTOMER: `${API_BASE_URL}/customer`,
  FILTER_KAMAR: `${API_BASE_URL}/filter_kamar`,
  IMAGE_TIPE_KAMAR: `${API_BASE_URL}/image/tipe_kamar`,
  IMAGE_USER: `${API_BASE_URL}/image/user`,
  IMAGE_CUSTOMER: `${API_BASE_URL}/image/customer`,
};

export default API_BASE_URL;
