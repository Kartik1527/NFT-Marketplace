import json
import os
from solcx import compile_standard, install_solc

# Install Solidity compiler (if not installed already)
install_solc("0.8.0")

def compile_solidity_contract():
    # Correct path to your Solidity contract
    contract_path = os.path.join(os.path.dirname(__file__), '../contracts/NftMarketPlace.sol')

    # Read the Solidity contract
    with open(contract_path, 'r') as file:
        nft_marketplace_contract = file.read()

    # Compile the contract using solc
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {
                "NftMarketPlace.sol": {
                    "content": nft_marketplace_contract
                }
            },
            "settings": {
                "outputSelection": {
                    "*": {
                        "*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]
                    }
                }
            }
        },
        solc_version="0.8.0",
    )

    # Save ABI and bytecode to files
    abi = compiled_sol['contracts']['NftMarketPlace.sol']['NFTMarketplace']['abi']
    bytecode = compiled_sol['contracts']['NftMarketPlace.sol']['NFTMarketplace']['evm']['bytecode']['object']

    # Write ABI to a JSON file
    with open('../build/NFTMarketplace.abi', 'w') as abi_file:
        json.dump(abi, abi_file, indent=4)

    # Write bytecode to a file
    with open('../build/NFTMarketplace.bin', 'w') as bytecode_file:
        bytecode_file.write(bytecode)

    print("Contract compiled successfully!")
    print(f"ABI and Bytecode saved to ../build/")

if __name__ == "__main__":
    compile_solidity_contract()