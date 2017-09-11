import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Storage } from '@ionic/storage';

import { SOCKET_HOST } from '../config';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  chat = io(SOCKET_HOST + '/chat');
  f_uid: string = '';
  chat_id: string = '';

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    this.storage.get('uesr_id')
    .then((user_id) => {
      if(user_id) {
        this.f_uid = user_id;
      }
    });

    this.chat.connect();

    this.chat.on('connect', () => {
      console.log('Connected to server.');
      this.chat_id = this.chat.id;
      this.storage.set('socket_id', this.chat.id);
    });

    this.chat.on('msg', (data) => {
      console.log(data)
    });

    this.chat.on('disconnect', () => {
      console.log('Server disconnected.');
    });
  }

  sendMessage(t_uid, message) {
    this.chat.emit('message', this.f_uid, t_uid, message);
  }

}
