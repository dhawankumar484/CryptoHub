import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {
  bannerData :any=[];
  currency : string = "INR";
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api:ApiService, private router:Router, private currencyService: CurrencyService){ }

  ngOnInit(): void {
    this.getAllData();
    this.currencyService.getCurrency().subscribe(val => {
      this.currency = val;
      this.getAllData();
    })
      
  }

  getAllData(){
    this.api.getCurrency(this.currency).subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row:any){
    this.currencyService.fromHome=false;
    this.router.navigate(['crypto-details', row.id]);
  }



}
