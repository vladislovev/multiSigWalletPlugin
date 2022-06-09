// import './App.css';
import Web3 from 'web3';
import {Transaction} from 'ethereumjs-tx'
import Contract from 'web3-eth-contract';
import * as fs from 'fs';


class sendEthTransactionTest {

  async auth() {
    const  accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    alert(`Your adress is: ${accounts[0]}`);
    return accounts
  }


    /*
    * send eth on other adresses
    * @param {address} addressTo
    * @param {number} ethValue
    * @param {privateKey} privateKey 
    * @returns {hash} sendETH transaction hash
    */
  async sendEth() {

    const addressTo = document.getElementById("receiverAccount").value;
    const ethValue = document.getElementById("ethValue").value;
    const privateKey = new Buffer('0ea823537c6acb44ede9a106c4f6ebd4f3f27f257c8831557af8278886b1b2eb', 'hex');

    let accounts = await sendEthTransactionTest.prototype.auth()

    const web3 = new Web3(Web3.givenProvider);
    const addressFrom = await accounts[0];
  
  
    const txData = {
      gasLimit: web3.utils.toHex(25000),
      gasPrice: web3.utils.toHex(10e9), // 10 Gwei
      to: addressTo,
      from: addressFrom,
      value: web3.utils.toHex(web3.utils.toWei(ethValue, 'wei'))
    };

    const txCount = await web3.eth.getTransactionCount(addressFrom)

    const newNonce = web3.utils.toHex(txCount);

    const transaction = await new Transaction({ 
        ...txData, 
        nonce: newNonce 
      }, 
      { chain: 'rinkeby' });

      await transaction.sign(privateKey);

      const serializedTx = await transaction.serialize().toString('hex');

      const hash = web3.eth.sendSignedTransaction('0x' + serializedTx);

      return hash
  }

  async sendToken() {
    const addressTo = document.getElementById("receiverAccount").value;
    const tokenValue = document.getElementById("ethValue").value;
    const privateKey = new Buffer('0ea823537c6acb44ede9a106c4f6ebd4f3f27f257c8831557af8278886b1b2eb', 'hex');

    const tokenAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
    const abiArray = JSON.parse(fs.readFileSync('sampleToken.json', 'utf-8'));
    const tokenContract = new Contract(abiArray, tokenAddress);

    let accounts = await sendEthTransactionTest.prototype.auth()

    const web3 = new Web3(Web3.givenProvider);
    const addressFrom = accounts[0];

    const txData = {
        gasLimit: web3.utils.toHex(25000),
        gasPrice: web3.utils.toHex(10e9), // 10 Gwei
        to: tokenAddress,
        from: addressFrom,
        value: web3.utils.toHex(web3.utils.toWei(tokenValue, 'wei')),
        data: tokenContract.methods.transferFrom(addressTo, 10, {from: addressFrom})
    };

    const txCount = await web3.eth.getTransactionCount(addressFrom)

    const newNonce = web3.utils.toHex(txCount);

    const transaction = await new Transaction({ 
        ...txData, 
        nonce: newNonce 
      }, 
      { chain: 'rinkeby' });

      await transaction.sign(privateKey);

      const serializedTx = await transaction.serialize().toString('hex');

      const hash = web3.eth.sendSignedTransaction('0x' + serializedTx);

      return hash
  }
}


function App() {

  return (
    <div className="App">
      <button onClick={sendEthTransactionTest.prototype.auth}>Authorize</button>
      <p>Value:</p>
      <input id="ethValue" type="number"></input>
      <p>To:</p>
      <input id="receiverAccount" type="text"></input><br/>
      <button onClick={sendEthTransactionTest.prototype.sendEth}>Send Ethereum</button>
      <button onClick={sendEthTransactionTest.prototype.sendToken}>Send My Token</button>
    </div>
  )
}

export default App;
