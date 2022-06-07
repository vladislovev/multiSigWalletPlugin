import './App.css';
import Web3 from 'web3';
let accounts

async function auth() {
  accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  alert(`Your adress is: ${accounts[0]}`);
}

async function sendEth() {
  const web3 = new Web3(Web3.givenProvider);
  const Tx = require('ethereumjs-tx').Transaction
  const addressFrom = accounts[0];
  const addressTo = document.getElementById("receiverAccount").value;
  const ethValue = document.getElementById("ethValue").value;
  const privateKey = new Buffer('0ea823537c6acb44ede9a106c4f6ebd4f3f27f257c8831557af8278886b1b2eb', 'hex');

  const txData = {
    gasLimit: web3.utils.toHex(25000),
    gasPrice: web3.utils.toHex(10e9), // 10 Gwei
    to: addressTo,
    from: addressFrom,
    value: web3.utils.toHex(web3.utils.toWei(ethValue, 'wei'))
  };

  web3.eth.getTransactionCount(addressFrom).then(txCount => {
    const newNonce = web3.utils.toHex(txCount);
    const transaction = new Tx({ ...txData, nonce: newNonce }, { chain: 'rinkeby' });
    transaction.sign(privateKey);
    const serializedTx = transaction.serialize().toString('hex');
    return web3.eth.sendSignedTransaction('0x' + serializedTx);
  });
}

function App() {
  return (
    <div className="App">
      <button onClick={auth}>Authorize</button>
      <p>Value:</p>
      <input id="ethValue" type="number"></input>
      <p>To:</p>
      <input id="receiverAccount" type="text"></input><br/>
      <button onClick={sendEth}>Send Ethereum</button>
    </div>
  )
}

export default App;
