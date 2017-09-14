import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SERVER_HOST } from '../config';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

  url: string = SERVER_HOST + '/message/';

  constructor(public http: Http) {
    console.log('Hello MessageProvider Provider');
  }

  getMessages(f_uid, t_uid) {
    let params = {
      f_uid: f_uid,
      t_uid: t_uid
    };
    return this.http.post(this.url + 'getMessages', params)
      .map(res => res.json());
  }

  getRequests(t_uid) {
    return this.http.post(this.url + 'getRequests', {t_uid: t_uid})
      .map(res => res.json());
  }

}
