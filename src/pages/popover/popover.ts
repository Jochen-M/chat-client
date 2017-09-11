import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  addFrind() {
    this.viewCtrl.dismiss();
    this.app.getRootNav().push('SearchFriendPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
