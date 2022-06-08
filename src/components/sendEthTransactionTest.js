import './App.css';
import Web3 from 'web3';
import {Transaction} from 'ethereumjs-tx'




class sendEthTransactionTest {

  async auth() {
    const  accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    alert(`Your adress is: ${accounts[0]}`);
    return accounts
  }


    /**
    * send eth on other adresses
    * @param {address} addressTo
    * @param {number} ethValue
    * @param {privateKey} privateKey 
    * @returns {hash} sendETH transaction hash
    */
  async sendEth(addressTo, ethValue, privateKey) {

    let accounts = await this.auth()

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

}






function App() {

  const addressTo = document.getElementById("receiverAccount").value;
  const ethValue = document.getElementById("ethValue").value;
  const privateKey = new Buffer('0ea823537c6acb44ede9a106c4f6ebd4f3f27f257c8831557af8278886b1b2eb', 'hex');

  return (
    <div className="App">
      <button onClick={auth}>Authorize</button>
      <p>Value:</p>
      <input id="ethValue" type="number"></input>
      <p>To:</p>
      <input id="receiverAccount" type="text"></input><br/>
      <button onClick={() => {sendEth(addressTo, ethValue, privateKey)}}>Send Ethereum</button>
    </div>
  )
}

export default App;
