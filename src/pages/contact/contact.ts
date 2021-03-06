import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/user/user';
import { MessageProvider } from '../../providers/message/message';
import { MockProvider } from '../../providers/mock/mock';

import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';

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
  requests: Message[] = [];
  avatars: string[] = [];
  mottos: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public userProvider: UserProvider,
    public messageProvider: MessageProvider,
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
    this.getRequests();
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

  getRequests() {
    this.requests = [];
    this.messageProvider.getRequests(this.user_id)
      .subscribe(
        data => {
          console.log(data);
          for(let request of data.requests) {
            this.requests.push(request);
          }
        },
        err => {

        }
      );
  }

  dealRequests() {
    this.app.getRootNav().push('DealRequestsPage', {token: this.token, requests: this.requests});
  }

  searchFriend() {
    this.app.getRootNav().push('SearchFriendPage');
  }

  chatWith(friend) {
    this.app.getRootNav().push('ChatDetailPage', {user_id: this.user_id, friend: friend});
  }

}
