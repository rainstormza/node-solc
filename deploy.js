// It is used to sign transactions for web3 wallet.
const HDWalletProvider = require('truffle-hdwallet-provider')
const PrivateKeyProvider = require('truffle-privatekey-provider')
const privateKey = ''

// It is used to interact with Ethereum smart contracts
const Web3 = require('web3')

// Interface and bytecode object from compiled exhibition contract
const { interface, bytecode } = require('./compile')

// list of 12 words key to connect account. You can get this key when you setup a MetaMask
const mnemonic = ''

// Infura rinkeby API url.
// Specify ethereum network need to connect to
const accessToken =
  'https://rinkeby.infura.io/v3/c320c6ba4199497d80efa8256094eff8'

// Create a wallet provider to connect outside rinkeby network
// const provider = new HDWalletProvider(mnemonic, accessToken, 1) // address_index 1
const provider = new PrivateKeyProvider(privateKey, accessToken)

// Create a new instance of web3 with wallet provider and unlock the rinkeby account
const web3 = new Web3(provider)

// This function is used to deploy contract
const deploy = async () => {
  // Get list of accounts
  const accounts = await web3.eth.getAccounts()
  console.log('accounts: ', accounts)

  // Assign SimpleERC20Token interface
  const ABI = interface
  // Create a contract with SimpleERC20Token ABI, then deploy with bytecode
  // and then finally send a transaction to rinkeby network with gas
  // and which account its deploy from
  const result = await new web3.eth.Contract(JSON.parse(ABI))
    .deploy({
      data: '0x' + bytecode
    })
    .send({ from: accounts[0], gas: '1000000' })
  // Note this address. It will be used to create contract instance from Angular 5 application.
  console.log('contract deployed to', result.options.address)
}

// Call deploy function.
deploy()
