import { useEffect, useState } from 'react';
import { getMyNFTs } from '../utils/interact';

const MyNFTs = () => {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    async function fetchNFTs() {
      const myNFTs = await getMyNFTs();
      setNFTs(myNFTs);
    }
    fetchNFTs();
  }, []);

  return (
    <div>
      <h2>My NFTs</h2>
      {nfts.map((nft, index) => (
        <div key={index}>
          <p>Token ID: {nft.tokenId}</p>
          <p>Price: {nft.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MyNFTs;
