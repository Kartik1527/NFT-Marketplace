import React, { useState } from 'react';
import axios from 'axios';

function ListNFT() {
  const [formData, setFormData] = useState({ nft_id: '', price: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/list_nft/', formData)
      .then(response => alert(`Transaction Hash: ${response.data.transaction_hash}`))
      .catch(error => console.error('Error listing NFT:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>List NFT</h2>
      <label>
        NFT ID:
        <input type="text" name="nft_id" value={formData.nft_id} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="text" name="price" value={formData.price} onChange={handleChange} required />
      </label>
      <button type="submit">List</button>
    </form>
  );
}

export default ListNFT;