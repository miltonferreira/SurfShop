import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  public wavesPosition: number = 0;
  public wavesDifference: number = 80;

  public userLogin: User = {};
  public userRegister: User = {};

  private loading: any;

  constructor(
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
    ) { }

  ngOnInit() {}

  segmentChanged(event: any){
    if(event.detail.value === "login"){
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login(){

    await this.presentLoading(); // chama tela de loading

    try{
      await this.authService.login(this.userLogin); // tenta logar
    } catch (error){
     this.presentToast(error.message); // mostra mensagem de erro
    } finally {
      this.loading.dismiss(); // tira o loading da tela quando carregar infos
    }

  }

  async register(){

    await this.presentLoading(); // chama tela de loading

    try{

      const user = await this.authService.register(this.userRegister);
      user.user.uid; // pega o id unico do usuario
      
    } catch (error){
      let message: string;

      switch(error.code){
        case 'auth/email-already-in-use':
          message = "E-mail sendo usado";
          break;
          case 'auth/invalid-email':
          message = "E-mail inválido";
          break;
          default:
            message = error.message;
          break;
      }

     // this.presentToast(error.message); *** mostra error em ingles
     this.presentToast(message); // mostra error personalizado em portugues

    } finally {
      this.loading.dismiss(); // tira o loading da tela quando carregar infos
    }

  }

  async presentLoading() { // mostra tela de carregamento, quanto carrega infos
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...'});
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000});
    toast.present();
  }

}
