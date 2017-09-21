import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ChatProvider } from '../../providers/chat/chat';
import { MessageProvider } from '../../providers/message/message';
import { MockProvider } from '../../providers/mock/mock';

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
  chats: any[] = [];
  avatars: string[] = [];
  mottos: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public storage: Storage,
    public chatProvider: ChatProvider,
    public messageProvider: MessageProvider,
    public mockProvider: MockProvider
  ) {
    this.avatars = mockProvider.getAvatars();
    this.mottos = mockProvider.getMottos();
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

  ionViewWillEnter() {
    console.log('ionViewWillEnter ChatPage');
    this.initChats();
  }

  initChats() {
    this.messageProvider.initChats(this.user_id)
      .subscribe(
        data => {
          console.log(data);
          this.chats = [];
          for(let chat of Object.keys(data.chats)) {
            if(data.chats[chat]['f_user']._id == this.user_id) {
              data.chats[chat]['friend'] = data.chats[chat]['t_user'];
            } else {
              data.chats[chat]['friend'] = data.chats[chat]['f_user'];
            }
            this.chats.push(data.chats[chat]);
          }
          console.log(this.chats);
        },
        err => {
          console.log(err);
        }
      );
  }

  gotoChatDetail() {
    this.app.getRootNav().push('ChatDetailPage', {user_id: this.user_id});
  }

  chatWith(friend) {
    this.app.getRootNav().push('ChatDetailPage', {user_id: this.user_id, friend: friend});
  }

}
