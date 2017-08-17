import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

import * as io from 'socket.io-client';
import * as moment from 'moment';

import { AuthService } from "../_service/auth.service";

@Component({
  selector: 'main-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  user: string;
  socket: any = null;
  chatForm: FormGroup;
  messages: Array<Array<string>>;
  logs: Array<Array<string>>;
  users: Array<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {

  }

  ngOnInit() {
    this.user = this.getUser();

    this.messages = [];
    this.logs = [];
    this.users = [];

    this.connect();
    this.setEvents();
    this.chatForm = this.fb.group({
      message: ['']
    });
  }

  onSubmit({ value }: { value: any }) {
    this.socket.emit('message', { user: this.user, message: value.message, date: moment().format('lll') });
    this.chatForm.reset();
  }

  @HostListener('window:beforeunload')
  disconnectFromChat() {
    this.socket.emit('user disconnected', { user: this.user, message: 'User disconnected', date: moment().format('lll') });
  }

  getUser() {
    return localStorage.getItem('user');
  }

  connect() {
    this.socket = io.connect('http://localhost:4201');
    this.socket.emit('user added', { user: this.user, message: 'User added', date: moment().format('lll') });
  }

  setEvents() {
    this.socket.on('message', (data) => {
      this.messages.push([data.user, data.message, data.date]);
    });

    this.socket.on('user added', (data) => {
      this.users = data.users;
    });

    this.socket.on('user disconnected', (data) => {
      this.users = data.users;
    });
  }
}
