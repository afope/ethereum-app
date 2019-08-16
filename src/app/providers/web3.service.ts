import { Injectable } from '@angular/core';
const Web3 = require('web3');

declare let window: any;
declare let require: any;
declare let Buffer: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private _web3: any;

  constructor() {
    this.initializeWeb3();
  }

  initializeWeb3() {
    // set the provider you want from Web3.providers
    const infuraUrl = "rinkeby.infura.io/v3/8ac2e3a4dfda4f3ba9db59c9edc30e27"
    const providerPath = "wss://rinkeby.infura.io/ws"
    this._web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    console.log('web3', this._web3)
    this._web3.eth.defaultAccount = "0x8c4a2413D8afB3fD6B2E83ED2a98f8468CbbD6D4";
    const eventProvider = new Web3.providers.WebsocketProvider(providerPath)


    //listen for disconnects
   eventProvider.on('error', e => handleDisconnects(e));
   eventProvider.on('end', e => handleDisconnects(e))

   this._web3.setProvider(eventProvider)

   function handleDisconnects(e) {
     console.log("error",e);
   }
  }

  public async getNonce(): Promise <any> {
    return new Promise((resolve, reject) => {
      this._web3.eth.getTransactionCount(this._web3.eth.defaultAccount, (error, result) => {
        if(error != null) {
          return reject(error);
        }
          return resolve(this._web3.utils.numberToHex(result));
      });
    }) as any;
  }

public async getGasPrice(): Promise <any> {
  return new Promise((resolve, reject) => {
    this._web3.eth.getGasPrice((error, result) => {
      if(error != null) {
        return reject(error);
      }
      return resolve(this._web3.utils.toHex(Number(result)));
    });
  }) as any;
}

public async sendSignedTransaction(rawTx: any): Promise <any> {
  var Tx = require('ethereumjs-tx');
  var privateKey = new Buffer('9BF62CB948A82F43C7D6CA611B1634422CF561AFBB61AF3D2EA316547670244D', 'hex')
  var tx = new Tx(rawTx);
  tx.sign(privateKey);
  var serializedTx = tx.serialize();
  console.log(serializedTx.toString('hex'));
  console.log(typeof serializedTx.toString('hex'))
  return new Promise((resolve, reject) => {
    this._web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (error, result) => {
      if(error != null) {
        return reject(error);
      }
      return resolve(result);
    });
  }) as any
}

public async querySentTransaction(transactionHash: string): Promise <any> {
  return new Promise((resolve, reject) => {
    this._web3.eth.getTransaction(transactionHash, (error, result) => {
      if(error != null ) {
        return reject(error);
      }
      return resolve(String(result))
    });
  }) as any
}
}
