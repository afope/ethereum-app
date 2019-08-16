import { Component, OnInit } from "@angular/core";
import { Web3Service } from "../../providers/web3.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private rawTx = {
    chainId: 4,
    nonce: 10000000000,
    gasPrice: 400000,
    gasLimit: 3000000,
    from: "0x9549cd4020C12fc2122CB3937bCAAAAB54E6462D",
    to: "0x8c4a2413D8afB3fD6B2E83ED2a98f8468CbbD6D4",
    value: 0,
    data:
      "0x7f4e616d65526567000000000000000000000000000000000000000000000000003057307f4e616d6552656700000000000000000000000000000000000000000000000000573360455760415160566000396000f20036602259604556330e0f600f5933ff33560f601e5960003356576000335700604158600035560f602b590033560f60365960003356573360003557600035335700"
  };

  private transaction: any;
  private result: any;

  constructor(private web3: Web3Service) {}

  ngOnInit() {
    this.getGasPrice();
    this.getNonce();
    this.getSignedTransaction(this.rawTx);
  }

  public getGasPrice() {
    this.web3
      .getGasPrice()
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }

  public getNonce() {
    this.web3
      .getNonce()
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }

  public getSignedTransaction(rawTx: any) {
    this.web3
      .sendSignedTransaction(rawTx)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }

  public sendSignedTransaction(rawTx: any) {
    this.web3
      .sendSignedTransaction(rawTx)
      .then(result => {
        this.transaction = result;
        console.log('transaction', this.transaction)
        alert('Transaction successful!')
        return result;
      })
      .catch(err => {
        return err
      });
  }

  public querySentTransaction(transactionHash: string) {
    this.web3
      .querySentTransaction(transactionHash)
      .then(result => {
        this.result = result;
        alert('Query successful!')
        if (result == 'null') {
          alert('Your result is null! This means your transaction has not beeen mined yet. Please try again later.')
        }
        return result;
      })
      .catch(err => {
        alert('Please make sure you send your transaction first!')
        return err;
      });
  }
}
