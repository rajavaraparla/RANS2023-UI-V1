import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StockInfoComponent } from './stock-info/stock-info.component';


const routes: Routes = [
  {
    path:'',component: HomeComponent,
  },
  {
    path:'stock-info/:symbol', component: StockInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
