import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockInfoService } from '../services/stock-info.service'
 // Import your service here

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})

export class StockInfoComponent implements OnInit {
  symbol: string = '';
  stockData: any;

  constructor(private route: ActivatedRoute, private stockInfoService: StockInfoService) {
    this.route.params.subscribe((params) => {
      this.symbol = params['symbol'];
      if (this.symbol) {
        this.loadStockData();
      }
    });
  }

  ngOnInit() {
  }

  private loadStockData() {
    // Fetch stock information using this.symbol
    this.stockInfoService.getStockInfo(this.symbol).subscribe(
      (data) => {
        this.stockData = data;
        // You can also perform additional processing here
      },
      (error) => {
        console.error('Error fetching stock data:', error);
      }
    );
  }
}
