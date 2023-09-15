import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { StockInfoService } from 'src/app/services/stock-info.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: string[] = [];
  searchControl = new FormControl();
  searchMoviesCtrl = new FormControl();
  filteredStocks: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 1;
  selectedStock: any = "";
  stockData: any; // To store the fetched stock data
  constructor(private dataService: DataService, private stockInfoService: StockInfoService,  private router: Router) {

  }

  onSelected() {
    if (this.selectedStock) {
      this.stockInfoService.getStockInfo(this.selectedStock.Symbol).subscribe(
        () => {
          // this.stockData = data;
          // console.log("HEADER-ONSELECTED:", data)
          this.router.navigate(['/stock-info', this.selectedStock.Symbol]);
        },
        (error) => {
          console.error('Error fetching stock data:', error);
        }
      );
    }
  }

  // onSelected() {
  //   console.log("selected Movie", this.selectedStock);
  //   this.selectedStock = this.selectedStock;
  // }


  displayWith(value: any) {
    return value?.Title;
  }

  clearSelection() {
    this.selectedStock = "";
    this.filteredStocks = [];
  }

  ngOnInit() {
    this.searchMoviesCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredStocks = [];
          this.isLoading = true;
        }),
        
        switchMap(value => this.dataService.getAutocompleteSuggestions(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        // data is return array, Check if array is empty
        if (data) {
          this.errorMsg = "";
          this.filteredStocks = data;
        } else
        // Check if the response is an error
        {
          this.errorMsg = "ERROR!";
          this.filteredStocks = [];
        }
      });
  }


  fetchDataAndOpenMenu(menutype:string) {
    // Fetch data from the backend service every time the button is clicked
    this.dataService.fetchMeunData(menutype).subscribe((data:any) => {
      console.log('fetchMeunData',data)
      // Populate the menu items with data
      this.menuItems =[]
       this.menuItems.push(data.activity);
    });
  }
  onInputChange(value: string): void {
    // You can add additional logic here if needed
  }

}
