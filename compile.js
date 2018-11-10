// The path module provides utilities for working with file and directory paths.
const path = require('path')

// fs-extra adds file system methods that aren't included in the native fs module
// and adds promise support to the fs methods.
const fs = require('fs-extra')

// It is used to compile solidity files
const solc = require('solc')

// This code removes a file or directory inside the Build directory
// __dirname returns the current the directory path
const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

// It returns SimpleERC20Token.sol path
const contractPath = path.resolve(
  __dirname,
  'Contracts',
  'SimpleERC20Token.sol'
)

// Get the content of SimpleERC20Token.sol
const exhibitionSource = fs.readFileSync(contractPath, 'utf8')

// This code compile the SimpleERC20Token contract code and return the contracts object
const output = solc.compile(exhibitionSource, 1).contracts

// Ensures that the directory 'Build' exists. If the directory structure does not exist, it is created.
fs.ensureDirSync(buildPath)

// Create a JSON file with SimpleERC20Token contract. It will be used to create contract instance from React application.
fs.outputJsonSync(
  path.resolve(buildPath, 'erc20.json'),
  output[':SimpleERC20Token']
)

// Export SimpleERC20Token contract
module.exports = output[':SimpleERC20Token']

// https://github.com/ethereum/solc-js
