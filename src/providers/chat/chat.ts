import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

import { Message } from '../../models/message.model';

import { SERVER_HOST } from '../config';
import { SOCKET_HOST } from '../config';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  url: string = SERVER_HOST + '/message/';
  chat = io(SOCKET_HOST + '/chat');
  uid: string = '';

  constructor(
    public http: Http
  ) {
  }

  online(uid) {
    this.uid = uid;

    this.chat.emit('online', this.uid);

    this.chat.on('connect', () => {
      console.log('Connected to server.');
    });

    this.chat.on('disconnect', () => {
      console.log('Server disconnected.');
    });
  }

  sendMessage(f_uid, t_uid, message) {
    this.chat.emit('message', f_uid, t_uid, message);
  }

  getMessages(f_uid, t_uid) {
    let params = {
      f_uid: f_uid,
      t_uid: t_uid
    };
    return this.http.post(this.url + 'getMessages', params)
      .map(res => res.json())
  }

  leave(uid) {
    this.chat.emit('leave', uid);
  }

  // 观察者模式
  msgObserver() {
    let observable = new Observable(observer => {
      this.chat.on('msg', (f_uid, t_uid, message) => {
        observer.next(new Message(f_uid, t_uid, message));
      })
    })
    return observable;
  }

}
