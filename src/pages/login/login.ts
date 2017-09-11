import { Component } from '@angular/core';
import { NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/user/user';

import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = '';
  password: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public storage: Storage,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.username = this.navParams.get('username') || '';
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    loading.present();
    if(this.username.trim() != '' && this.password.trim() != '') {
      this.userProvider.login(this.username, this.password)
        .subscribe(
          data => {
            console.log(data);
            loading.dismiss();
            if(data.status == 200) {
              this.storage.set('token', data.token);
              this.storage.set('user_id', data.user_id);
              this.storage.set('username', data.username);
              this.app.getRootNav().setRoot(TabsPage);
            } else {
              this.alertCtrl.create({
                title: data.message,
                buttons: ['取消']
              }).present();
            }
          },
          err => {
            console.log(err)
          }
        );
    }
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  gotoRegister() {
    this.app.getRootNav().push('RegisterPage');
  }

}
