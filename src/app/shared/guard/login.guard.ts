import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  userFsid: any;

  constructor(private router: Router, private oauthService: OAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.oauthService.tryLogin().then(() => {
      const claims: any = this.oauthService.getIdentityClaims();
      if (claims) {
        this.userFsid = claims.email;
        console.log('Guard - FSID criado com sucesso!');
        this.router.navigate(['']);

        /*
        loginEmail
          se Fsid Vinculado
            então rota painel
          senão
            rota login
        */
      }
    });
    return true;
  }
}
