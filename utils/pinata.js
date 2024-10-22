// utils/pinata.js
import axios from 'axios';

const PINATA_API_KEY = '';
const PINATA_SECRET_API_KEY = '';

const pinata = axios.create({
  baseURL: 'https://api.pinata.cloud/pinning',
  headers: {
    pinata_api_key: PINATA_API_KEY,
    pinata_secret_api_key: PINATA_SECRET_API_KEY,
  },
});

export const pinFileToIPFS = async (file) => {
  const data = new FormData();
  data.append('file', file);

  try {
    const response = await pinata.post('/pinFileToIPFS', data, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    });
    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error pinning file to IPFS: ', error);
    return null;
  }
};

export const pinJSONToIPFS = async (jsonData) => {
  try {
    const response = await pinata.post('/pinJSONToIPFS', jsonData);
    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error pinning JSON to IPFS: ', error);
    return null;
  }
};
