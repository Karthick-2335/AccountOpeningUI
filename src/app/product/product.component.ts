import { Component,OnInit } from '@angular/core';
import { SipService } from 'src/service/sip.service';
import { Basketdetails, SIPBasket, StockList } from 'src/model/request/sipModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  ProductBucket : SIPBasket = new SIPBasket();
  ProductBasket : any;
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
        this.ProductBucket = resp.results;
        this.ProductBasket = this.ProductBucket.Basketdetails;
        this.NoOfMonth = this.ProductBucket.NoOfMonths;
        this.selectedMonth = this.ProductBucket.selectMonth;
        console.log(this.ProductBucket.Basketdetails);
      });
  }

  ngOnInit(): void {
    this.getSIP();
  }

  cardClick(id : number) {
    this.getBasketId = id;
    this.StockBucket = [];
    this.popUp = true;
    const stk = this.ProductBasket.filter((x: { ID: number; }) => { return x.ID === id });
    this.StockBucket.push(stk[0]);
  }
  close() {
    this.popUp = false;
    this.termsandcondition = false;
  }
  async eachStockPlus(StockId : number, id : number) {
    let basevalue = 0;
    const terminal = this.ProductBasket.filter((x: { ID: number; }) => { return x.ID === id });
    console.log(terminal);

    terminal[0].StockList.forEach((element : any, index : any) => {
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
    const terminal = this.ProductBasket.filter((x: { ID: number; }) => { return x.ID === id });
    console.log(terminal);
    
    terminal[0].StockList.forEach((element : any, index: any) => {
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
    const terminal = this.ProductBasket.filter((x: { ID: number; }) => { return x.ID === BasketId });
    terminal[0].StockList.forEach((element: { qty: number; totalPrice: string; price: string; }, index: any) => {
      element.qty = element.qty * 2
      element.totalPrice = (parseFloat(element.price) * element.qty).toFixed(1);
      basevalue -= parseFloat(element.totalPrice);
    });
    terminal[0].Base_Value = Math.abs(basevalue).toFixed(1);
  }
  allStockMinus(BasketId : number) {
    let basevalue = 0;
    const terminal = this.ProductBasket.filter((x: { ID: number; }) => { return x.ID === BasketId });
    terminal[0].StockList.forEach((element: { qty: number; OriginalQty: number; totalPrice: string; price: string; }, index: any) => {
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
      Basketdetails : this.ProductBasket.filter((x: { ID: any; StockList: any[]; }) =>  { return x.ID === this.getBasketId && x.StockList.filter((y: { Basket_id: any; }) => y.Basket_id === this.getBasketId) }),
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
