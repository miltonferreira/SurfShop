import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private products = new Array<Product>();
  private productsSubscription: Subscription;
  private loading: any;

  constructor(
    private productsService: ProductService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data; // recebe as infos do produto
    });
   }

  ngOnInit() {
    //necessario para mostrar produto na home quando for salvo
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data; // recebe as infos do produto
    });
  }

  ngOnDestroy(){
    this.productsSubscription.unsubscribe; // destroi escuta pra o recurso quando sair da página
    console.log('Destruiu');
  }

  // desloga da pagina
  async logout(){
    try{
      await this.authService.logout();
    }catch(error){
      console.error(error);
    }
  }

  async deleteProduct(id: string){
    try {
      await this.productsService.deleteProduct(id);
    } catch(error){
      this.presentToast('Erro ao tentar salvar');
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
