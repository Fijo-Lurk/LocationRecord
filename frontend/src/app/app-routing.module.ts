import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationTableComponent } from './location-table/location-table.component';

const routes: Routes = [
  { path: '', component: LocationTableComponent },
  {
    path: 'page-not-found',
    component: LocationTableComponent,
  },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
