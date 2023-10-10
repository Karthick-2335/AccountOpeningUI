export class response
{
  response:SIPBasket;
}

export class SIPBasket
{
  success:any; 
  data :Basketdetails[];
  NoOfMonths : any;
  selectMonth : any;
  successMessage : any;
}

export class Basketdetails
{
  ID : any;
  Base_Value : any;
  Basket_name : string;
  Nudgeline1 : string;
  Nudgeline2 : string;
  Onelinertext : string;
  StockList : StockList[];
}

export class StockList
{
    Basket_id : any;
    Imagepath : any;
    price : any;
    qty : any;
    scripid : any;
    stockName : any;
    totalPrice : any;
    OriginalQty:any;
}