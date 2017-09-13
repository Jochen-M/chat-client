import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  token: string = '';
  user_id: string = '';
  search_text: string = '';
  users: User[] = [];
  avatars: string[] = [];
  mottos: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public userProvider: UserProvider,
    public mockProvider: MockProvider
  ) {
    this.avatars = mockProvider.getAvatars();
    this.mottos = mockProvider.getMottos();
  }

  async ngOnInit() {
    console.log('ContactPage ngOnInit()');
    let token = await this.storage.get('token');
    if(token) {
      this.token = token;
    }
    let user_id = await this.storage.get('user_id');
    if(user_id) {
      this.user_id = user_id;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFriendPage');
  }

  searchFriend(event) {
    this.userProvider.searchFriend(this.token, this.search_text)
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

  addFriend(t_uid) {
    this.userProvider.addFriend(this.token, this.user_id, t_uid)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }

  presentPrompt(t_uid) {
    let alert = this.alertCtrl.create({
      title: '请求添加好友',
      inputs: [
        {
          name: 'request_info',
          placeholder: '请输入请求信息'
        }
      ],
      buttons: [
        {
          text: '添加',
          handler: data => {
            this.addFriend(t_uid);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
