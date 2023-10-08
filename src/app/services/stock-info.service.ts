import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockInfoService {
  private server = "http://marketinsightiq.com:5000"
  // /data/<ticker>/fundamentals
  constructor(private http: HttpClient) {}

  getStockInfo(stockSymbol: string): Observable<any> {

    const url = `${this.server}/v1/data/stock-info/fundamentals?ticker=${stockSymbol}`;
    
    // I need to Log the data before  returning
    // console.log(this.http.get(url));
    return this.http.get(url);
  }
}
