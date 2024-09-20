from web3 import Web3
import json

# Connect to Ganache
ganache_url = "http://127.0.0.1:7545"  # Ensure this matches the port Ganache is running on
web3 = Web3(Web3.HTTPProvider(ganache_url))

if web3.is_connected():
    print("Connected to Ganache")
else:
    print("Failed to connect to Ganache")
    exit(1)

# Load contract ABI
with open('../build/NFTMarketplace.abi', 'r') as abi_file:
    abi = json.load(abi_file)

# Contract address
contract_address = '0x10FF3a4E53b7c1885938170293dc003A69824A6e'

# Load contract
NFTMarketplace = web3.eth.contract(address=contract_address, abi=abi)

# Mint an NFT
tx_hash = NFTMarketplace.functions.mintNFT('https://kartik1527.github.io/Test-NFT/nft.json').transact({
    'from': web3.eth.accounts[0]
})
tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
print(f"NFT Minted: {tx_receipt}")