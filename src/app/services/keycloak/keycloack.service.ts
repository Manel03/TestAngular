import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  constructor(private http: HttpClient) {} 
  private _keycloak: Keycloak | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'actia-lms-network',
        clientId: 'lms'
      });
    }
    return this._keycloak;
  }

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token || '';
    }
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    // this.keycloak.accountManagement();
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'});
  }
   getHistoriqueLogs() {
    return this.http.get<any[]>('http://localhost:8000/api/logs'); 
  }
}
