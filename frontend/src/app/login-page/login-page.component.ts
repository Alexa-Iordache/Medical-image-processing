import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RpcService } from '../services/rpc.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public authFailed = false;

  @Input() currentPage: any
  @Output() loginButtonPressed = new EventEmitter<string>();

  constructor(
    private router: Router,
    private rpcService: RpcService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if (!this.currentPage)
      this.currentPage = 'login';
  }

  login(username: string, password: string): void {
    console.log('s-a apasat butonul de login');

    // if there is no username or password
    if (!username || !password) {
      console.log('username or password was not introduced');
      return;
    }

    let parameters = {
      username: username,
      password: password,
      query: `SELECT * FROM Users WHERE Username = '${username}' LIMIT 1;`
    }

    let copyInstance = this; // a copy of this class (atributes + methods)

    this.rpcService.callRPC('auth.login', parameters, (error: any, res: any) => {
      if(error) {
        console.log('login failed');
        this.authFailed = true;
        return;
      }

      // daca nu avem eroare
      copyInstance.cookieService.set('medical-login', res.result.encoded);
      copyInstance.loginButtonPressed.emit('done');
      copyInstance.router.navigate(['/main-page']);
      console.log('a mers logarea');
    })
  }
}
