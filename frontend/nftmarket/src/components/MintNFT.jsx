import React, { useState } from 'react';
import axios from 'axios';

function MintNFT() {
  const [formData, setFormData] = useState({ address: '', uri: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/mint_nft/', formData)
      .then(response => alert(`Transaction Hash: ${response.data.transaction_hash}`))
      .catch(error => console.error('Error minting NFT:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mint NFT</h2>
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </label>
      <label>
        URI:
        <input type="text" name="uri" value={formData.uri} onChange={handleChange} required />
      </label>
      <button type="submit">Mint</button>
    </form>
  );
}

export default MintNFT;