import { Component,OnInit } from '@angular/core';
import { SipService } from 'src/service/sip.service';
import { Basketdetails, SIPBasket, StockList } from 'src/model/request/sipModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  SIPBucket: Basketdetails[] = [];
  ProductBucket : SIPBasket = new SIPBasket();
  ProductBasket : Basketdetails[] = [];
  StockBucket: any[] = [];
  NoOfMonth: any[] = [];
  selectedMonth: any;
  termsandcondition: boolean = false;
  getBasketId : any;
  PostRequest : SIPBasket = new SIPBasket();
  Basketdetails: Basketdetails = new Basketdetails;
  StockList: StockList = new StockList();
  popUp: boolean = false
  constructor(private SipService: SipService) { }

  getSIP(): void {
    this.SipService.getAll()
      .subscribe(resp => {
        console.log(resp);
        this.ProductBasket = resp.results;
        this.ProductBucket.NoOfMonths= resp.NoOfMonths;
        this.ProductBucket.selectMonth = resp.selectMonth;
        console.log(this.ProductBasket);
        
        this.NoOfMonth = this.ProductBucket.NoOfMonths;
        this.selectedMonth = this.ProductBucket.selectMonth;
      });
  }

  ngOnInit(): void {
    this.getSIP();
  }

  getStock(arr : any) {
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

  cardClick(id : number) {
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
  async eachStockPlus(StockId : number, id : number) {
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
  eachStockMinus(StockId : number, id : number) {
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
  allStockPlus(BasketId : number) {
    let basevalue = 0;
    const terminal = this.SIPBucket.filter(x => { return x.ID === BasketId });
    terminal[0].StockList.forEach((element, index) => {
      element.qty = element.qty * 2
      element.totalPrice = (parseFloat(element.price) * element.qty).toFixed(1);
      basevalue -= parseFloat(element.totalPrice);
    });
    terminal[0].Base_Value = Math.abs(basevalue).toFixed(1);
  }
  allStockMinus(BasketId : number) {
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
      Basketdetails : this.SIPBucket.filter(x =>  { return x.ID === this.getBasketId && x.StockList.filter(y => y.Basket_id === this.getBasketId) }),
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
