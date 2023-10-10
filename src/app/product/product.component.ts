import { Component,OnInit } from '@angular/core';
import { SipService } from 'src/service/sip.service';
import { Basketdetails, SIPBasket, StockList } from 'src/model/sipModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  SIPBucket: Basketdetails[] = [];
  StockBucket: any[] = [];
  NoOfMonth: any[] = [];
  selectedMonth: any;
  termsandcondition: boolean;
  getBasketId : any;
  PostRequest : SIPBasket = new SIPBasket();
  Basketdetails: Basketdetails = new Basketdetails();
  StockList: StockList = new StockList();
  popUp: boolean = false
  constructor(private SipService: SipService) { }

  getSIP(): void {
    this.SipService.getAll()
      .subscribe(resp => {
        for (let i = 0; i < resp.response.data.length; i++) {
          this.Basketdetails = {
            Base_Value: resp.response.data[i]['Basketdetails'].Base_Value,
            Basket_name: resp.response.data[i]['Basketdetails'].Basket_name,
            ID: resp.response.data[i]['Basketdetails'].ID,
            Nudgeline1: resp.response.data[i]['Basketdetails'].Nudgeline1,
            Nudgeline2: resp.response.data[i]['Basketdetails'].Nudgeline2,
            Onelinertext: resp.response.data[i]['Basketdetails'].Onelinertext,
            StockList: this.getStock(resp.response.data[i])
          }
          this.SIPBucket.push(this.Basketdetails)
        }
        this.NoOfMonth = resp.response.NoOfMonths;
        this.selectedMonth = resp.response.selectMonth
      });
  }

  ngOnInit(): void {
    this.getSIP();
  }

  getStock(arr) {
    let StockArray = [];
    for (let j = 0; j < arr.StockList.length; j++) {
      if (arr.Basketdetails.ID === arr.StockList[j].Basket_id) {
        this.StockList = {
          Basket_id: arr.StockList[j].Basket_id,
          scripid: arr.StockList[j].scripid,
          stockName: arr.StockList[j].stockName,
          qty: arr.StockList[j].qty,
          price: arr.StockList[j].price,
          Imagepath: arr.StockList[j].Imagepath,
          totalPrice: arr.StockList[j].qty * arr.StockList[j].price,
          OriginalQty: arr.StockList[j].OriginalQty
        }
        StockArray.push(this.StockList);
      }
    }
    return StockArray
  }

  cardClick(id) {
    this.getBasketId = id;
    this.StockBucket = [];
    this.popUp = true;
    const stk = this.SIPBucket.filter(x => { return x.ID === id });
    this.StockBucket.push(stk[0]);
  }
  close() {
    this.popUp = false;
    this.termsandcondition = false;
  }
  async eachStockPlus(StockId, id) {
    let basevalue = 0;
    const terminal = this.SIPBucket.filter(x => { return x.ID === id });
    terminal[0].StockList.forEach((element, index) => {
      if (element.scripid === StockId) {
        element.qty++;
        element.totalPrice = (parseFloat(element.price) * element.qty).toFixed(1);
      }
      basevalue += parseFloat(element.totalPrice);
    });
    terminal[0].Base_Value = basevalue.toFixed(1);

  }
  eachStockMinus(StockId, id) {
    let basevalue = 0;
    const terminal = this.SIPBucket.filter(x => { return x.ID === id });
    terminal[0].StockList.forEach((element, index) => {
      if (element.scripid === StockId && element.qty > element.OriginalQty) {
        Math.floor(element.qty--);
        element.totalPrice = (parseFloat(element.price) * element.qty).toFixed(1);
      }
      basevalue -= parseFloat(element.totalPrice);
    });
    terminal[0].Base_Value = Math.abs(basevalue).toFixed(1);

  }
  allStockPlus(BasketId) {
    let basevalue = 0;
    const terminal = this.SIPBucket.filter(x => { return x.ID === BasketId });
    terminal[0].StockList.forEach((element, index) => {
      element.qty = element.qty * 2
      element.totalPrice = (parseFloat(element.price) * element.qty).toFixed(1);
      basevalue -= parseFloat(element.totalPrice);
    });
    terminal[0].Base_Value = Math.abs(basevalue).toFixed(1);
  }
  allStockMinus(BasketId) {
    let basevalue = 0;
    const terminal = this.SIPBucket.filter(x => { return x.ID === BasketId });
    terminal[0].StockList.forEach((element, index) => {
      if (element.qty / 2 > element.OriginalQty) {
        element.qty = Math.floor(element.qty / 2)
        element.totalPrice = (parseFloat(element.price) * element.qty).toFixed(1);
        basevalue += parseFloat(element.price) * element.qty
      }
      else {
        basevalue += parseFloat(element.price) * element.qty
      }
    });
    terminal[0].Base_Value = Math.abs(basevalue).toFixed(1);
  }
  investNow() {
    this.PostRequest = {
      success : true,
      selectMonth : this.selectedMonth,
      NoOfMonths : null,
      data : this.SIPBucket.filter(x =>  { return x.ID === this.getBasketId && x.StockList.filter(y => y.Basket_id === this.getBasketId) }),
      successMessage : "Going to Invest"
    }
    console.log(this.PostRequest);
    this.SipService.postSip(this.PostRequest)
    .subscribe(resp => {
      console.log(resp);
      
    });
  }
  onRadioChange(event: any) {
    this.selectedMonth = event.target.value;
  }
  acceptTermsandCond() {
    if (!this.termsandcondition) {
      this.termsandcondition = true;
    }
    else {
      this.termsandcondition = false;
    }
  }
}
