import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from '../service/currency.service';


@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.scss']
})
export class CryptoDetailsComponent implements OnInit {

  coinData: any;
  coinId!: string;
  days: number=1;
  currency: string ="INR";
  activeButton:string = 'btn1'
public lineChartData: ChartConfiguration['data']={
  datasets: [
    {
      data:[],
      label:'Price Trends',
      backgroundColor: 'rgba(148, 159, 177, 0.2)',
      borderColor: '#105D97',
      pointBackgroundColor: '#105D97',
      pointBorderColor: '#105D97',
      pointHoverBackgroundColor: '#105D97',
      pointHoverBorderColor: '#105D97',
    }
  ],
  labels:[]
};

public lineChartOptions: ChartConfiguration['options']={
  elements: {
    point:{
      radius:1
    }
  },
  plugins:{
    legend:{
      display:true
    }
  }
};

public lineChartType: ChartType = 'line';
@ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api:ApiService, private actRoute:ActivatedRoute, private currencyService: CurrencyService, private router:Router){ }

  ngOnInit(): void {
    this.coinId = this.actRoute.snapshot.params['id'];
    this.getCoinData();
    this.getGraphData(this.days);
    this.currencyService.getCurrency().subscribe(val=>{
      this.currency = val;
      this.getGraphData(this.days);
      this.getCoinData();
    })
  }

  getCoinData(){
    this.api.getCurrencyById(this.coinId).subscribe(res=>{
      // console.log(this.coinData);
      if(this.currency === "USD"){
        res.market_data.current_price.inr = res.market_data.current_price.usd;
        res.market_data.market_cap.inr = res.market_data.market_cap.usd;
      }
      res.market_data.current_price.inr = res.market_data.current_price.inr;
      res.market_data.market_cap.inr = res.market_data.market_cap.inr;
      this.coinData = res;
    })
  }

  getGraphData(days:number){
    this.days = days;
    this.api.getGrpahicalCurrencyData(this.coinId, this.currency, this.days).subscribe(res=>{
      setTimeout(()=>{
        this.myLineChart.chart?.update();
      }, 200);
      // console.log(res);
      this.lineChartData.datasets[0].data= res.prices.map((a:any)=>{
        return a[1];
      });
      this.lineChartData.labels = res.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() >12? `${date.getHours()-12}: ${date.getMinutes()} PM` : `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days === 1? time: date.toLocaleDateString();
      })
    })
  }

  goBack(){
    if(this.currencyService.fromHome){
      this.router.navigate(['home']);
    }
    if(!this.currencyService.fromHome){
      this.router.navigate(['crypto-list']);
    }
  }

}
