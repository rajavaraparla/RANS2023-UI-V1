import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private autoCompleteList: { Symbol: string, Name: string }[] = [];
  private server = "http://marketinsightiq.com:5000"
  private apiUrl = `${this.server}/v1/data/stocks-list`;

  // Create an instance of HttpHeaders and set the Content-Type to application/json
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {
      // Fetch and store the list when the service is initialized
      // change string[] to a map/dictionary
      this.fetchAutocompleteList().subscribe((stockList: { Symbol: string, Name: string }[]) => {
        this.autoCompleteList = stockList;
      });
  }
  private fetchAutocompleteList(): Observable<{ Symbol: string, Name: string }[]> {
    // Make an HTTP call to fetch the autocomplete list
    // Replace 'YOUR_API_KEY' and 'YOUR_ENDPOINT' with your actual API key and endpoint
    // return this.http.get<{ Symbol: string, Name: string }[]>('http://localhost:5000/data/stocks-list').pipe(
    console.log(this.apiUrl)

    return this.http.get<{ Symbol: string, Name: string }[]>(this.apiUrl).pipe(
      catchError((error) => {

        console.error('Error fetching autocomplete list', error);
        return of([]); // Return an empty array in case of an error
      })
      
    );
  }  

  fetchMeunData(menutype:string): Observable<any> {
    return this.http.get<any>(`http://www.boredapi.com/api/activity?type=${menutype}`);
  }

  getAutocompleteSuggestions(value: string): Observable<{ Symbol: string, Name: string }[]> {

    const filteredSuggestions = this.autoCompleteList.filter(item =>
      item.Symbol.trim().toLowerCase().includes(value.trim().toLowerCase())
    );
    return of(filteredSuggestions); // Return the filtered suggestions as an Observable
  }
  
}
function type(stockList: { Symbol: string; Name: string; }[]): any {
  throw new Error('Function not implemented.');
}

