import { useState } from 'react';
import { listNFT } from '../utils/interact';

const ListNFT = () => {
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");

  const list = async () => {
    const result = await listNFT(tokenId, price);
    if (result.success) {
      alert("Listing successful!");
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <h2>List an NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price (in ETH)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={list}>List NFT</button>
    </div>
  );
};

export default ListNFT;
