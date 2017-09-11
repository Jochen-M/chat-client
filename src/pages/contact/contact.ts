import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { MockProvider } from '../../providers/mock/mock';

import { User } from '../../models/user.model';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  friends: User[] = [];
  avatars: string[] = [];
  mottos: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public mockProvider: MockProvider,
    public app: App
  ) {
    this.avatars = mockProvider.getAvatars();
    this.mottos = mockProvider.getMottos();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ContactPage');
    this.getFriends();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  getFriends() {
    this.userProvider.initFriends()
      .subscribe(
        data => {
          console.log(data);
          this.friends.splice(0, this.friends.length);
          for(let friend of data.friends) {
            this.friends.push(friend);
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  chatWith(friend) {
    this.app.getRootNav().push('ChatDetailPage', {friend: friend});
  }

}
