// utils/uploadToPinata.js
import { pinFileToIPFS, pinJSONToIPFS } from './pinata';

export const uploadFileToPinata = async (file) => {
  return await pinFileToIPFS(file);
};

export const uploadMetadataToPinata = async (metadata) => {
  return await pinJSONToIPFS(metadata);
};