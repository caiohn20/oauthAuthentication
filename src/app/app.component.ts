import { Component, OnInit } from '@angular/core';

import { environment } from '../environments/environment';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste-fsid';
  userFsid: any;

  constructor(
    private oauthService: OAuthService,
  ) {

    //FSID------------------------------------------------------------------
    //debug
    oauthService.events.subscribe(
      e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e)
    );

    oauthService.configure(environment.authConfig);
    oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        if (!oauthService.hasValidAccessToken()) {
          console.log('FSID precisa ser criado!');
          oauthService.initLoginFlow();
        } else {
          console.log('FSID criado com sucesso!');
        }
      });
    oauthService.setupAutomaticSilentRefresh();
  }

  public logoff() {
    this.oauthService.logOut();
  }
  //FSID------------------------------------------------------------------

  public login() {
    alert('Login');
  }

  public get name() {
    return "nome";
  }
}
