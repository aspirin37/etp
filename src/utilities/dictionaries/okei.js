import API from 'api';

function setToCache(okeiList) {
  localStorage.setItem('OKEI', JSON.stringify(okeiList));
}

export default async function getOKEI() {
  const cashedOkei = localStorage.getItem('OKEI');
  if (cashedOkei) return JSON.parse(cashedOkei);

  try {
    const response = await API.get('okei');
    setToCache(response.data);
    return response.data;
  } catch (error) {
    return [];
  }
}
