import React, { useState } from 'react';
import axios from 'axios';

function PurchaseNFT() {
  const [formData, setFormData] = useState({ address: '', nft_id: '', value: '', private_key: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/purchase_nft/', formData)
      .then(response => alert(`Transaction Hash: ${response.data.transaction_hash}`))
      .catch(error => console.error('Error purchasing NFT:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Purchase NFT</h2>
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </label>
      <label>
        NFT ID:
        <input type="text" name="nft_id" value={formData.nft_id} onChange={handleChange} required />
      </label>
      <label>
        Value:
        <input type="text" name="value" value={formData.value} onChange={handleChange} required />
      </label>
      <label>
        Private Key:
        <input type="text" name="private_key" value={formData.private_key} onChange={handleChange} required />
      </label>
      <button type="submit">Purchase</button>
    </form>
  );
}

export default PurchaseNFT;