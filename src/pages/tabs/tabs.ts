import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  chat     = 'ChatPage';
  contact  = 'ContactPage';
  discover = 'DiscoverPage';
  user     = 'UserPage';

  constructor(
    public popoverCtrl: PopoverController
  ) {

  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }
}
