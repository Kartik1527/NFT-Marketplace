from web3 import Web3
import json
from django.conf import settings

# Connect to local Ganache instance
web3 = Web3(Web3.HTTPProvider(settings.GANACHE_URL))

def load_contract():
    with open('../build/NFTMarketplace.abi') as f:
        contract_abi = json.load(f)

    # Load the deployed contract address
    contract_address = settings.CONTRACT_ADDRESS

    # Load the contract
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    return contract

def mint_nft(user_address, uri):
    contract = load_contract()
    tx = contract.functions.mintNFT(uri).buildTransaction({
        'from': user_address,
        'nonce': web3.eth.getTransactionCount(user_address)
    })

    signed_tx = web3.eth.account.sign_transaction(tx, private_key=settings.PRIVATE_KEY)
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return web3.toHex(tx_hash)

def list_nft(nft_id, price):
    contract = load_contract()
    tx = contract.functions.listNFT(nft_id, price).buildTransaction({
        'from': web3.eth.defaultAccount,
        'nonce': web3.eth.getTransactionCount(web3.eth.defaultAccount)
    })

    signed_tx = web3.eth.account.sign_transaction(tx, private_key=settings.PRIVATE_KEY)
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return web3.toHex(tx_hash)

def purchase_nft(user_address, private_key, nft_id, value):
    contract = load_contract()
    tx = contract.functions.purchaseNFT(nft_id).buildTransaction({
        'from': user_address,
        'value': value,
        'nonce': web3.eth.getTransactionCount(user_address)
    })

    signed_tx = web3.eth.account.sign_transaction(tx, private_key=private_key)
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    return web3.toHex(tx_hash)
