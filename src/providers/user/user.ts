import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { SERVER_HOST } from '../config';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  url: string = SERVER_HOST + '/user/';

  constructor(
    public http: Http
  ) {
    console.log('Hello UserProvider Provider');
  }

  login(username, password) {
    return this.http.post(this.url + 'login', {
        username: username,
        password: password
      }).map(res => res.json());
  }

  register(username, password) {
    return this.http.post(this.url + 'register', {
        username: username,
        password: password
      }).map(res => res.json());
  }

  searchFriend(token, search_text) {
    let headers = new Headers({
      'Authorization': 'Bearer ' + token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'search', {search_text: search_text}, options)
      .map(res => res.json());
  }

  addFriend(token, f_uid, t_uid) {
    let headers = new Headers({
      'Authorization': 'Bearer ' + token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'addFriend', {
        f_uid: f_uid,
        t_uid: t_uid
      }, options)
      .map(res => res.json());
  }

  initFriends(token, user_id) {
    let headers = new Headers({
      'Authorization': 'Bearer ' + token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'initFriends', {user_id: user_id}, options)
      .map(res => res.json());
  }

}
