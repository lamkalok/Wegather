import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';
// import { QRScanner, QRScannerStatus } from 'cordova-plugin-qrscanner';

/**
 * Generated class for the WalletTransferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-transfer',
  templateUrl: 'wallet-transfer.html',
})
export class WalletTransferPage {

  account: any;
  toAddress: string;
  amount: number;
  password: string;
  fromAddress: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public ethereumProvider: EthereumProvider,
    public shareServiceProvider: ShareServiceProvider,
    public walletServiceProvider: WalletServiceProvider
  ) {
    this.account = this.navParams.data;
    this.fromAddress = this.account.address;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletTransferPage');
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      this.shareServiceProvider.showToast(barcodeData.text);
      this.toAddress = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  transfer() {
    if (this.amount == null) {
      this.shareServiceProvider.showAlert("Please enter the amount");
      return;
    }
    if (this.amount <= 0) {
      this.shareServiceProvider.showAlert("Amount shoud be greater than 0");
      return;
    }
    if (this.password == null) {
      this.shareServiceProvider.showAlert("Please enter the password");
      return;
    }
    if (this.toAddress == null) {
      this.shareServiceProvider.showAlert("Please enter the receiver address");
      return;
    }

    try {
      this.shareServiceProvider.showLoadingWithCustomContent("Please wait, it may take a long time...");
      this.ethereumProvider.checkBalance(this.fromAddress).then(weBal => {
        if (parseFloat(weBal) >= this.amount) {
          this.ethereumProvider.checkEthBalance(this.fromAddress).then(ethBal => {
            if (parseFloat(ethBal) >= 0.00005) {
              
              this.ethereumProvider.decrypt(this.account.keystone, this.password).then(acc => {
                console.log("decrypt acc", acc);
                
                if (this.fromAddress == acc.address) {
                  this.ethereumProvider.transferWeCoin(acc, this.toAddress, this.amount).then(receipt => {
                    console.log(receipt);
                    this.shareServiceProvider.hideLoading();
                    this.confirmTransferSuccess("The block hash: " + receipt.blockHash);
                  })
                } else {
                  this.shareServiceProvider.hideLoading();
                  this.shareServiceProvider.showAlert("Wrong password, transfer failed");
                }
              })
            } else {
              this.shareServiceProvider.hideLoading();
              this.shareServiceProvider.showAlert("You don't have enough Ether to pay the gas fee");
              return;
            }
          })
        } else {
          this.shareServiceProvider.hideLoading();
          this.shareServiceProvider.showAlert("You don't have enough WeCoin");
          return;
        }
      })
    } catch (error) {
      this.shareServiceProvider.showAlert(error);
      this.shareServiceProvider.hideLoading();
    }
  }

  confirmTransferSuccess(msg){
    const confirm = this.alertCtrl.create({
      title: "Success",
      message: "Token Transfer Succsessfully! " + msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
