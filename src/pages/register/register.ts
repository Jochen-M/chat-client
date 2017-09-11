import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from '../../providers/user/user';

import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  username: string = '';
  password: string = '';
  confirm_password: string = '';

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
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    let loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    loading.present();
    if(this.username.trim() != '' &&
       this.password.trim() != '' &&
       this.password == this.confirm_password) {
      this.userProvider.register(this.username, this.password)
        .subscribe(
          data => {
            console.log(data);
            loading.dismiss();
            if(data.status == 200) {
              this.app.getRootNav().setRoot(LoginPage, {username: this.username});
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
    } else {

    }
  }

}
