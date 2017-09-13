import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
export class ContactPage implements OnInit {

  token: string = '';
  user_id: string = '';
  friends: User[] = [];
  avatars: string[] = [];
  mottos: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public userProvider: UserProvider,
    public mockProvider: MockProvider,
    public app: App
  ) {
    this.avatars = mockProvider.getAvatars();
    this.mottos = mockProvider.getMottos();
  }

  async ngOnInit() {
    console.log('ContactPage ngOnInit');
    let token = await this.storage.get('token');
    if(token) {
      this.token = token;
    }
    let user_id = await this.storage.get('user_id');
    if(user_id) {
      this.user_id = user_id;
    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ContactPage');
    this.initFriends();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  initFriends() {
    this.userProvider.initFriends(this.token, this.user_id)
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
    this.app.getRootNav().push('ChatDetailPage', {user_id: this.user_id, friend: friend});
  }

}
