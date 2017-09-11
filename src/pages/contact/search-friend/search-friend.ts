import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../../providers/user/user';
import { MockProvider } from '../../../providers/mock/mock';

import { User } from '../../../models/user.model';

/**
 * Generated class for the SearchFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-friend',
  templateUrl: 'search-friend.html',
})
export class SearchFriendPage {

  search_text: string = '';
  users: User[] = [];
  avatars: string[] = [];
  mottos: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public mockProvider: MockProvider
  ) {
    this.avatars = mockProvider.getAvatars();
    this.mottos = mockProvider.getMottos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFriendPage');
  }

  searchFrind() {
    this.userProvider.searchFriend(this.search_text)
      .subscribe(
        data => {
          console.log(data);
          this.users.splice(0, this.users.length);
          for(let user of data.users){
            this.users.push(user);
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  addFriend(user_id) {
    this.userProvider.addFriend(user_id)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }

}
