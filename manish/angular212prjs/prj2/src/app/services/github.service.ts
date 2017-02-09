import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {
  private username:string;
  private client_id = '85ed9b6325343133f7cc';
  private client_secret = '2be6c435e81399b75348100d909f3ea7a2e226a1';

  constructor(private _http: Http) {
    console.log('Github service ready...');
    this.username = 'manishkhanchandani';
  }

  getUser() {
    return this._http.get('http://api.github.com/users/' + this.username + '?client_id='+this.client_id + '&client_secret='+this.client_secret).map(res => res.json());
  }

  getRepos() {
    return this._http.get('http://api.github.com/users/' + this.username + '/repos?client_id='+this.client_id + '&client_secret='+this.client_secret).map(res => res.json());
  }

  updateUser(username:string) {
    this.username = username;
  }
}