import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Message } from '../../../models/message.model';

import { MockProvider } from '../../../providers/mock/mock';
import { UserProvider } from '../../../providers/user/user';

/**
 * Generated class for the DealRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deal-requests',
  templateUrl: 'deal-requests.html',
})
export class DealRequestsPage {

  token: string = '';
  requests: Message[] = [];
  avatars: string[] = [];
  mottos: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mockProvider: MockProvider,
    public userProvider: UserProvider
  ) {
    this.token = this.navParams.get('token');
    this.requests = this.navParams.get('requests');
    this.avatars = mockProvider.getAvatars();
    this.mottos = mockProvider.getMottos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealRequestsPage');
  }

  agreeRequest(request) {
    this.userProvider.addFriend(this.token, request.f_user._id, request.t_user)
      .subscribe(
        data => {
          console.log(data);
          this.removeRequest(request);
        },
        err => {
          console.log(err);
        }
      );
  }

  rejectRequest(request) {
    this.userProvider.rejectRequest(this.token, request.f_user._id, request.t_user)
      .subscribe(
        data => {
          console.log(data);
          this.removeRequest(request);
        },
        err => {
          console.log(err);
        }
      );
  }

  removeRequest(request) {
    let index = this.requests.indexOf(request);
    if(index != -1) {
      this.requests.splice(index, 1);
    }
  }

}
