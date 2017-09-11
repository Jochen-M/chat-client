import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChatProvider } from '../../../providers/chat/chat';

import { User } from '../../../models/user.model';

/**
 * Generated class for the ChatDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {

  friend: User = new User();
  message: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chatProvider: ChatProvider
  ) {
    this.friend = this.navParams.get('friend');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailPage');
  }

  sendMessage() {
    if(this.message.trim() != ''){
      this.chatProvider.sendMessage(this.friend._id, this.message);
      this.message = '';
    }
  }

}
