import { Component } from '@angular/core';

import * as io from 'socket.io-client';

@Component({
  selector: 'main-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  socket = null;

  constructor() {
    this.connect();
    this.setEvents();
  }

  connect() {
    this.socket = io.connect('http://localhost:4201');
    this.socket.emit('user added', { hello: 'World' });
  }

  setEvents() {
    this.socket.on('user added', function (data) {
      console.log(data);
    })
  }
}
