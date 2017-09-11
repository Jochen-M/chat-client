import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchFriendPage } from './search-friend';

@NgModule({
  declarations: [
    SearchFriendPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchFriendPage),
  ],
})
export class AddFriendPageModule {}
