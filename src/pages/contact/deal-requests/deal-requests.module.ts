import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealRequestsPage } from './deal-requests';

@NgModule({
  declarations: [
    DealRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(DealRequestsPage),
  ],
})
export class DealRequestsPageModule {}
