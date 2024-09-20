import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AvailableNFTs() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    axios.get('/api/available_nfts/')
      .then(response => setNfts(response.data.nfts))
      .catch(error => console.error('Error fetching available NFTs:', error));
  }, []);

  return (
    <div>
      <h2>Available NFTs</h2>
      {nfts.map(nft => (
        <div key={nft.token_id}>
          <h3>{nft.uri}</h3>
          <p>Price: {nft.price}</p>
          <p>Owner: {nft.owner}</p>
        </div>
      ))}
    </div>
  );
}

export default AvailableNFTs;