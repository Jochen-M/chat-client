import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ChatProvider } from '../../providers/chat/chat';

import { LoginPage } from '../login/login';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit {

  user_id: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public storage: Storage,
    public chatProvider: ChatProvider
  ) {
  }

  async ngOnInit() {
    console.log('UserPage ngOnInit');
    let user_id = await this.storage.get('user_id');
    if(user_id) {
      this.user_id = user_id;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  logout() {
    this.chatProvider.leave(this.user_id);
    this.storage.clear()
      .then(this.app.getRootNav().setRoot(LoginPage));
  }

}
