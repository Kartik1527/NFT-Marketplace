import { ethers } from 'ethers';
import NFTMarketplace from '../../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json';
import dotenv from 'dotenv';

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

// Function to connect to the user's wallet
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return {
        success: true,
        address: accounts[0],
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to connect wallet: " + error.message,
      };
    }
  } else {
    return {
      success: false,
      message: "MetaMask not installed",
    };
  }
};

// Function to mint a new NFT
export const mintNFT = async (tokenURI, price) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, NFTMarketplace.abi, signer);

      const transaction = await contract.createToken(tokenURI, ethers.utils.parseEther(price), {
        value: ethers.utils.parseEther('0.01'), // Assuming a fee or base price
      });
      await transaction.wait(); // Wait for the transaction to be mined

      return { success: true };
    } else {
      return { success: false, message: "Ethereum object not found" };
    }
  } catch (error) {
    return { success: false, message: "Minting failed: " + error.message };
  }
};

// Function to list an NFT
export const listNFT = async (tokenId, price) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, NFTMarketplace.abi, signer);

      const transaction = await contract.listToken(tokenId, ethers.utils.parseEther(price));
      await transaction.wait(); // Wait for the transaction to be mined

      return { success: true };
    } else {
      return { success: false, message: "Ethereum object not found" };
    }
  } catch (error) {
    return { success: false, message: "Listing failed: " + error.message };
  }
};

// Function to buy an NFT
export const buyNFT = async (tokenId, price) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, NFTMarketplace.abi, signer);

      const transaction = await contract.buyToken(tokenId, {
        value: ethers.utils.parseEther(price), // Send the price of the NFT
      });
      await transaction.wait(); // Wait for the transaction to be mined

      return { success: true };
    } else {
      return { success: false, message: "Ethereum object not found" };
    }
  } catch (error) {
    return { success: false, message: "Purchase failed: " + error.message };
  }
};

// Function to get NFTs owned by the connected user
export const getMyNFTs = async () => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, NFTMarketplace.abi, provider);
      const address = await signer.getAddress(); // Get the user's address

      const nfts = await contract.getMyNFTs(address); // Assuming this function fetches NFTs by user address
      return nfts;
    } else {
      return { success: false, message: "Ethereum object not found" };
    }
  } catch (error) {
    console.log("Error fetching NFTs: ", error);
    return [];
  }
};
