import { useState } from 'react';
import { mintNFT } from '../utils/interact'; // Assuming mintNFT is for minting NFT after metadata upload
import { uploadMetadataToPinata } from '../../utils/uploadToPinata.js'; // Import the function to upload metadata

const MintNFT = () => {
  const [tokenURI, setTokenURI] = useState("");
  const [price, setPrice] = useState("");
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    image: "" // Assuming the image URL will be set here after upload
  });

  const uploadMetadata = async () => {
    try {
      const result = await uploadMetadataToPinata(metadata);
      if (result.success) {
        setTokenURI(result.url); // Set the returned URL as the tokenURI
        return true;
      } else {
        alert(result.message);
        return false;
      }
    } catch (error) {
      console.error("Error uploading metadata:", error);
      alert("Failed to upload metadata.");
      return false;
    }
  };

  const mint = async () => {
    // First upload metadata
    const isMetadataUploaded = await uploadMetadata();
    if (!isMetadataUploaded) {
      return; // Exit if metadata upload failed
    }

    // Then mint the NFT using the tokenURI from uploaded metadata
    const result = await mintNFT(tokenURI, price);
    if (result.success) {
      alert("Minting successful!");
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <h2>Mint a new NFT</h2>
      <input
        type="text"
        placeholder="Token Name"
        value={metadata.name}
        onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Token Description"
        value={metadata.description}
        onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={metadata.image}
        onChange={(e) => setMetadata({ ...metadata, image: e.target.value })}
      />
      <input
        type="text"
        placeholder="Price (in ETH)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={mint}>Mint NFT</button>
    </div>
  );
};

export default MintNFT;
