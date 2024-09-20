import React from 'react';
import MintNFT from './components/MintNFT';
import ListNFT from './components/ListNFT';
import PurchaseNFT from './components/PurchaseNFT';
import AvailableNFTs from './components/AvailableNFTs';

function App() {
  return (
    <div>
      <h1>NFT Marketplace</h1>
      <MintNFT />
      <ListNFT />
      <PurchaseNFT />
      <AvailableNFTs />
    </div>
  );
}

export default App;