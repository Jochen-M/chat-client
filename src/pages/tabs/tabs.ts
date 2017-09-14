import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PopoverPage } from '../popover/popover';

import { ChatProvider } from '../../providers/chat/chat';
import { UserProvider } from '../../providers/user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  chat     = 'ChatPage';
  contact  = 'ContactPage';
  discover = 'DiscoverPage';
  user     = 'UserPage';

  token: string = '';
  user_id: string = '';

  constructor(
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public chatProvider: ChatProvider,
    public userProvider: UserProvider,
    public storage: Storage
  ) {
    this.addFriendObserver();
  }

  addFriendObserver() {
    this.chatProvider.addFriendObserver()
      .subscribe(
        data => {
          console.log(data);
          this.userProvider.getUserById(this.token, data['f_uid'])
            .subscribe(
              _data => {
                this.presentConfirm(_data.user, data['f_uid'], data['request_info']);
              },
              _err => {
                console.log(_err);
              }
            );
        },
        err => {
          console.log(err);
        }
      );
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

  ionViewDidLoad() {
    console.log('TabsPage ionViewDidLoad');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }

  addFriend(f_uid) {
    this.userProvider.addFriend(this.token, f_uid, this.user_id)
    .subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  presentConfirm(f_user, f_uid, request_info) {
    let alert = this.alertCtrl.create({
      title: '新的好友请求',
      message: '<h1>' + f_user['username'] + ':</h1>' + request_info,
      buttons: [
        {
          text: '同意',
          handler: () => {
            console.log('Agree clicked');
            this.addFriend(f_uid);
          }
        },
        {
          text: '拒绝',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
