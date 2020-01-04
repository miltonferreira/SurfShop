import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements  CanActivate{
  
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(): Promise<boolean> {
    return new Promise( resolve => {
      this.authService.getAuth().onAuthStateChanged(user =>{ // verifica o estado, se está logado ou nao
        if(user) this.router.navigate(['home']); // se tiver logado manda para a pagina de home

        resolve(!user ? true : false); // retorna true se o user nao tiver logado
      });
    });
  }

}
