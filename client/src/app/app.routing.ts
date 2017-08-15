import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { ChatComponent } from './chat/chat.component';

import { PageNotFoundComponent } from './shared/page-not-found.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
