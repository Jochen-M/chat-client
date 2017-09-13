import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { ChatProvider } from '../../../providers/chat/chat';
import { MockProvider } from '../../../providers/mock/mock';

import { User } from '../../../models/user.model';
import { Message } from '../../../models/message.model';

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

  @ViewChild(Content) content: Content;

  user_id: string = '';
  friend: User = new User();
  message: string = '';
  messages: any[] = [];
  avatars: string[] = [];
  mottos: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chatProvider: ChatProvider,
    public mockProvider: MockProvider,
  ) {
    console.log('constructor ChatDetailPage')
    this.user_id = this.navParams.get('user_id');
    this.friend = this.navParams.get('friend');
    this.avatars = mockProvider.getAvatars();
    this.mottos = mockProvider.getMottos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatDetailPage');
    this.chatProvider.getMessages(this.user_id, this.friend._id)
      .subscribe(
        data => {
          console.log(data);
          this.messages = data.messages;
          this.messages.reverse();
        },
        err => {
          console.log(err);
        }
      );
    this.chatProvider.msgObserver()
      .subscribe(
        data => {
          console.log(data);
          this.messages.push(data);
          this.content.scrollToBottom();
        },
        err => {
          console.log(err);
        }
      )
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ChatDetailPage');
    this.content.scrollToBottom();
  }

  sendMessage() {
    if(this.message.trim() != ''){
      this.chatProvider.sendMessage(this.user_id, this.friend._id, this.message);
      this.messages.push(new Message(this.user_id, this.friend._id, this.message));
      this.message = '';
    }
    this.content.scrollToBottom();
  }

}
