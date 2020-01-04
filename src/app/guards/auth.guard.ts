import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
  
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(): Promise<boolean> {
    return new Promise( resolve => {
      this.authService.getAuth().onAuthStateChanged(user =>{ // verifica o estado, se está logado ou nao
        if(!user) this.router.navigate(['login']); // se não tiver logado manda pra a pagina de login caso esteja nulo ou indefinido

        resolve(user ? true : false); // retorna falso ou verdadeiro para a promise
      });
    });
  }

}
