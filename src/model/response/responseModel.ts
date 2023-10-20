export class response
{
    success : boolean = false;
    successMessage : string = '';
    errorCode : string = '';
    errorMessage : string = '';
    errors : any;
    results : any;
    statusCode : number = 0;
    token : string = '';
    referenceNumber : string = '';
    NoOfMonths : any[] = [];
    selectMonth : number = 12;
}