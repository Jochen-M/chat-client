import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { SERVER_HOST } from '../config';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  url: string = SERVER_HOST + '/user/';
  token: string = '';
  user_id: string = '';

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    console.log('Hello UserProvider Provider');
    this.storage.get('token')
    .then((token) => {
      if(token) {
        this.token = token;
      }
    });
    this.storage.get('user_id')
      .then((user_id) => {
        if(user_id) {
          this.user_id = user_id;
        }
      });
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

  loggedIn() {
    return this.user_id != '';
  }

  searchFriend(search_text) {
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'search', {search_text: search_text}, options)
      .map(res => res.json());
  }

  addFriend(user_id) {
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'addFriend', {
        f_uid: this.user_id,
        t_uid: user_id
      }, options)
      .map(res => res.json());
  }

  initFriends() {
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'initFriends', {user_id: this.user_id}, options)
      .map(res => res.json());
  }

}
