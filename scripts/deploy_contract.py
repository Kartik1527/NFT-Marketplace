from web3 import Web3
import json

# Connect to Ganache
ganache_url = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganache_url))

if web3.is_connected():
    print("Connected to Ganache")

# Set default account
web3.eth.default_account = web3.eth.accounts[0]

# Load contract bytecode and ABI
with open('../build/NFTMarketplace.bin', 'r') as bin_file:
    bytecode = bin_file.read()

with open('../build/NFTMarketplace.abi', 'r') as abi_file:
    abi = json.load(abi_file)

# Deploy contract
NFTMarketplace = web3.eth.contract(abi=abi, bytecode=bytecode)
tx_hash = NFTMarketplace.constructor().transact({'from': web3.eth.default_account})
tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

print(f"Contract deployed at address: {tx_receipt.contractAddress}")