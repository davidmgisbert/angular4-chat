import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LogInComponent } from './login/login.component';

import { PageNotFoundComponent } from './shared/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LogInComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
