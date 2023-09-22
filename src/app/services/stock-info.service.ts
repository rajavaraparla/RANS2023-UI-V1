import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockInfoService {
  // /data/<ticker>/fundamentals
  constructor(private http: HttpClient) {}

  getStockInfo(stockSymbol: string): Observable<any> {
    const url = `/v1/stock-info/fundamentals?ticker=${stockSymbol}`;
    
    // I need to Log the data before  returning
    console.log(this.http.get(url));
    return this.http.get(url);
  }
}
