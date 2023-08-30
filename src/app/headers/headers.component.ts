import { Component } from '@angular/core';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent {

  selectedCurrency:string="INR";

  constructor(private currencyService: CurrencyService){}

  changeCurrency(event:string){
    console.log(event);
    this.currencyService.setCurrency(event);
  }

}
