import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  bannerData :any=[];
  currency : string = "INR";

  constructor(private api:ApiService, private router:Router, private currencyService: CurrencyService){}

  ngOnInit(): void {
    this.getBannerData();
    this.currencyService.getCurrency().subscribe(val => {
      this.currency = val;
      this.getBannerData();
    })
      
  }

  getBannerData(){
    this.api.getTrendingCurrency(this.currency).subscribe(res=>{
      this.bannerData = res;
    })
  }

  gotoCryptoList(){
    this.router.navigate(['crypto-list']);
  }

  gotoDetails(row:any){
    this.currencyService.fromHome=true;
    this.router.navigate(['crypto-details', row.id]);
  }
}
