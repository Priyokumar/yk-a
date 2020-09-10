import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //{ path:"", loadChildren: ()=>import('./home/home.module').then(m=>m.HomeModule) },
  {path:'',redirectTo:'/catalog/category', pathMatch:'full'},
  { path:"catalog", loadChildren: ()=>import('./catalog/catalog.module').then(m=>m.CatalogModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
 