import { useState } from 'react';
import MintNFT from './components/MintNFT';
import ListNFT from './components/ListNFT';
import BuyNFT from './components/BuyNFT';
import MyNFTs from './components/MyNFT';
import { connectWallet } from './utils/interact';

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
  };

  return (
    <div>
      <button onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? `Connected: ${walletAddress}` : 'Connect Wallet'}
      </button>
      <MintNFT />
      <ListNFT />
      <BuyNFT />
      <MyNFTs />
    </div>
  );
}

export default App;
