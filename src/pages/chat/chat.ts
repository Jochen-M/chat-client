import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ChatProvider } from '../../providers/chat/chat';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit {

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
    console.log('ChatPage ngOnInit');
    let user_id = await this.storage.get('user_id');
    if(user_id) {
      this.user_id = user_id;
      this.chatProvider.online(user_id);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  gotoChatDetail() {
    this.app.getRootNav().push('ChatDetailPage', {user_id: this.user_id});
  }

}
