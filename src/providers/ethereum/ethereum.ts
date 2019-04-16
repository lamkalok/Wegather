
import { Injectable } from '@angular/core';

import Web3 from 'web3';
import _ from 'lodash';
import Bip39 from 'bip39';
import HDKey from 'hdkey';
import ethLib from 'eth-lib';
import { AppConfig } from './env.template';


import WeCoinContract from "./contracts/WeCoin.json";
import { convertUrlToDehydratedSegments } from 'ionic-angular/umd/navigation/url-serializer';

import { Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Http, Headers, RequestOptions } from '@angular/http';

var Tx = require('ethereumjs-tx');

@Injectable()
export class EthereumProvider {
  private web3js: any;
  private root: HDKey.HDKey;
  private accountAddress: string;
  private privateKey: string;
  private publicKey: string;
  private mnemonic: string;

  WeCoinDeploy: any;



  tokenContract: any;

  constructor(
    public plt: Platform,
    private http_ionic_native: HTTP
  ) {
    this.web3js = new Web3(new Web3.providers.HttpProvider(AppConfig.ethereum.provider));


    // this.accountAddress = AppConfig.ethereum.account;
    // this.privateKey = AppConfig.ethereum.privateKey;
    // console.log(this.accountAddress);
    // this.web3js.eth.getBalance(this.accountAddress).then(console.log);


    this.tokenContract = new this.web3js.eth.Contract(WeCoinContract.abi, WeCoinContract.address);


    // this.tokenContract.methods.balanceOf("0xc12A83339750bE19CA5158Ab03E827b43c9847af").call().then(b => {
    //   console.log("Balance of admin account", b);
    // });

  }

  public async getNetwork() {
    var net = "";
    await this.web3js.eth.net.getNetworkType(function (err, res) {
      console.log("Network Type: " + res);
      this.net = res;
    });
    return net;
  }

  public async checkEthBalance(account) {
    var bal = "";
    if (this.plt.is('ios')) {
      console.log("IOS check eth balance");
      let headers = new Headers(
        {
          'Content-Type': 'application/json'
        });

      let options = new RequestOptions({ headers: headers });
      var data = {
        'address': account
      }
      await this.http_ionic_native.post('https://wegathertoken.herokuapp.com/checkEthBalance', data, { Authorization: 'OAuth2: token' })
        .then(res => {
          var json_data = JSON.parse(res.data);
          console.log(json_data.balance);
          bal = json_data.balance;
          console.log(res.status);
          console.log(res.data); // data received by server
          console.log(res.headers);
        }).catch(error => {
          console.log(error);
        });
    } else {
      console.log("Non IOS check Eth balance");
      await this.web3js.eth.getBalance(account).then(b => {
        var realb = (b / Math.pow(10, 18));
        bal = realb + "";
      });
    }
    console.log("bal",bal); // data received by server
    return bal;

  }


  public async checkBalance(account) {
    var bal = "";
    if (this.plt.is('ios')) {
      console.log("IOS check balance");
      let headers = new Headers(
        {
          'Content-Type': 'application/json'
        });

      let options = new RequestOptions({ headers: headers });
      var data = {
        'address': account
      }
      await this.http_ionic_native.post('https://wegathertoken.herokuapp.com/checkBalance', data, { Authorization: 'OAuth2: token' })
        .then(res => {
          var json_data = JSON.parse(res.data);
          console.log(json_data.balance);
          bal = json_data.balance;
          console.log(res.status);
          console.log(res.data); // data received by server
          console.log(res.headers);
        }).catch(error => {
          console.log(error);
        });
    } else {
      console.log("Non IOS check balance");
      await this.tokenContract.methods.balanceOf(account).call().then(b => {
        bal = b;
      });
    }
    console.log("bal",bal); // data received by server
    return bal;
  }

  public async transferWeCoin(account, toAddress, amount) {
    var myAddress = account.address;
    var myPrivateKey = account.privateKey;
    var receipt;

    if (this.plt.is('ios')) {

      console.log("IOS transfer WeCoin");
      let headers = new Headers(
        {
          'Content-Type': 'application/json'
        });

      let options = new RequestOptions({ headers: headers });
      var data = {
        'address': account
      }
      await this.http_ionic_native.post('https://wegathertoken.herokuapp.com/checkBalance', data, { Authorization: 'OAuth2: token' })
        .then(res => {
          var json_data = JSON.parse(res.data);
          console.log(res.status);
          console.log(res.data); // data received by server
          console.log(res.headers);
        }).catch(error => {
          console.log(error);
        });

    } else {

      var count = await this.web3js.eth.getTransactionCount(myAddress);
      console.log(`num transactions so far: ${count}`);
  
      var contractAddress = WeCoinContract.address;
  
      // Gas Fee = Gas Limit x Gas Price
      // Gas Fee = 49674 * 1 / 10 ^ 9 =  0.000049674 ETH
  
      var rawTransaction = {
        "from": myAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": "0x3B9ACA00", //1000000000wei = 1Gwei
        "gasLimit": "0xC20A", //49674 unit
        "to": contractAddress,
        "value": "0x0",
        "data": this.tokenContract.methods.transfer(toAddress, amount).encodeABI(),
      };
      var privKey = new Buffer(myPrivateKey, 'hex');
      var tx = new Tx(rawTransaction);
      tx.sign(privKey);
      var serializedTx = tx.serialize();
      // Comment out these three lines if you don't really want to send the TX right now
      console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
      receipt = await this.web3js.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
      console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
  
      // // The balance may not be updated yet, but let's check
      // var balance = await this.tokenContract.methods.balanceOf(myAddress).call();
      // console.log(`Balance after send: ${balance}`);
  
      // var balance2 = await this.tokenContract.methods.balanceOf(toAddress).call();
      // console.log(`Balance after send: ${balance2}`);

    }

    return receipt;

  }

  public async transferToken() {
    var gasPrice = Web3.utils.toHex(100000000000000);
    var myAddress = "0xc12A83339750bE19CA5158Ab03E827b43c9847af";
    var toAddress = "0x31EE1881727b8Ee64664f123792C08Ca2B320480";
    var myPrivateKey = "ECF645C021725E3C171F58CE06D8F731346B453CDC4F05C4AF7D3BA73A38D010";

    var count = await this.web3js.eth.getTransactionCount(myAddress);
    console.log(`num transactions so far: ${count}`);

    var contractAddress = WeCoinContract.address;

    // Gas Fee = Gas Limit x Gas Price
    // Gas Fee = 49674 * 1 / 10 ^ 9 =  0.000049674 ETH

    var rawTransaction = {
      "from": myAddress,
      "nonce": "0x" + count.toString(16),
      "gasPrice": "0x3B9ACA00", //1000000000wei = 1Gwei
      "gasLimit": "0xC20A", //49674 unit
      "to": contractAddress,
      "value": "0x0",
      "data": this.tokenContract.methods.transfer(toAddress, 10).encodeABI(),
    };
    var privKey = new Buffer(myPrivateKey, 'hex');
    var tx = new Tx(rawTransaction);
    tx.sign(privKey);
    var serializedTx = tx.serialize();
    // Comment out these three lines if you don't really want to send the TX right now
    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
    var receipt = await this.web3js.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);

    // The balance may not be updated yet, but let's check
    var balance = await this.tokenContract.methods.balanceOf(myAddress).call();
    console.log(`Balance after send: ${balance}`);

    var balance2 = await this.tokenContract.methods.balanceOf(toAddress).call();
    console.log(`Balance after send: ${balance2}`);

    return receipt;
  }

  public getValue(key: string) {
    return _.get(this.web3js, key);
  }

  public generateMnemonic() {
    var mnemonic = Bip39.generateMnemonic();
    return mnemonic;
  }

  public generateAccountFromMnemonic(mnemonic: string) {
    if (!mnemonic) mnemonic = this.mnemonic;
    const seed = Bip39.mnemonicToSeed(mnemonic); //creates seed buffer
    var root = HDKey.fromMasterSeed(seed);
    var privateKey = root.privateKey.toString('hex');
    var account = this.web3js.eth.accounts.privateKeyToAccount('0x' + privateKey);
    account.privateKey = account.privateKey.substr(2);
    return account;
  }

  public async importAccountFromPrivateKey(privateKey: string) {
    var account = await this.web3js.eth.accounts.privateKeyToAccount("0x" + privateKey);
    return account;
  }




  public generateAccount() {
    const account = this.web3js.eth.accounts.create();
    this.accountAddress = account.address.substr(2);
    this.privateKey = account.privateKey.substr(2);
    console.log(account);
  }

  public async getBalance() {
    let balance = 0;
    if (this.accountAddress) {
      balance = await this.web3js.eth.getBalance(this.accountAddress);
      balance = (balance !== 0) ? this.web3js.utils.fromWei(balance, 'ether') : 0;
    }
    return balance;
  }

  public async sendTransaction(address: string, amount: number) {
    const account = this.web3js.eth.accounts.privateKeyToAccount('0x' + this.privateKey);
    this.web3js.eth.accounts.wallet.add(account);
    this.web3js.eth.defaultAccount = account.address;

    const params = {
      //nonce: 0,
      to: address,
      //from: this.accountAddress,
      value: this.web3js.utils.toWei(amount.toString(), 'ether'),
      gasPrice: 5000000000,
      gasLimit: 21000,
      //chainId: 3
    };

    const transaction = await this.web3js.eth.sendTransaction(params);
    return transaction.transactionHash;
  }

  public async signTransaction(address: string, amount: number) {
    const params = {
      to: address,
      value: this.web3js.utils.toWei(amount.toString(), 'ether'),
      gasPrice: 5000000000,
      gasLimit: 21000,
    };
    const transaction = await this.web3js.eth.accounts.signTransaction(params, '0x' + this.privateKey);
    return transaction;
  }

  public async encrypt(privateKey, password) {
    var keystone = await this.web3js.eth.accounts.encrypt("0x" + privateKey, password);
    return keystone;
  }

  public async decrypt(keystone, password) {
    var account = await this.web3js.eth.accounts.decrypt(keystone, password);
    account.privateKey = account.privateKey.substr(2);
    return account;
  }

  public getPrivateKey() {
    return this.privateKey;
  }

  public getAccount() {
    return this.accountAddress;
  }
  public getMnemonic() {
    return this.mnemonic;
  }

  public async getGasPrice() {
    return await this.web3js.eth.getGasPrice();
  }

  public async getChainId() {
    return await this.web3js.eth.net.getId()
  }


    // var http = new XMLHttpRequest();
    // var url = 'https://wegathertoken.herokuapp.com/testing';
    // // var url = 'http://192.168.0.104:5000/checkBalance';
    // var data = {
    //   'address': "0xc12A83339750bE19CA5158Ab03E827b43c9847af"
    // }
    // http.open('POST', url, true);

    // //Send the proper header information along with the request
    // http.setRequestHeader('Content-type', 'application/json');
    // var share = this.shareServiceProvider;
    // http.onreadystatechange = function () {//Call a function when the state changes.
    //   if (http.readyState == 4 && http.status == 200) {
    //     //alert(http.responseText);
    //     share.showConfirm(http.responseText, "OKOK");
    //   }
    // }
    // http.send(JSON.stringify(data));


}
