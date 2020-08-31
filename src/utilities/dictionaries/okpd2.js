import axios from '@/api/axios-config';

export async function getParents() {
  try {
    const response = await axios.get('okpd2');
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getChild(parentCode) {
  try {
    const response = await axios.get('okpd2', {
      params: { parentCode },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}
