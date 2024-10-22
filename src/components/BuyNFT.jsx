import { useState } from 'react';
import { buyNFT } from '../utils/interact';

const BuyNFT = () => {
  const [tokenId, setTokenId] = useState("");

  const buy = async () => {
    const result = await buyNFT(tokenId);
    if (result.success) {
      alert("Purchase successful!");
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <h2>Buy an NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={buy}>Buy NFT</button>
    </div>
  );
};

export default BuyNFT;
