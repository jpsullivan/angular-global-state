import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterOutlet, RxLet, AppShellComponent],
  providers: [...appConfig.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
