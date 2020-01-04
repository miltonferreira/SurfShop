import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public product: Product = {};
  private loading: any;
  private productId: string = null;
  private productSubscription: Subscription;


  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController
    
  ) {
    this.productId = this.activeRoute.snapshot.params['id']; // pega o id do produto

    if(this.productId) this.loadProduct(); // verifica se o id do produto existe, se existir carrega o produto
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.productSubscription) this.productSubscription.unsubscribe(); // destroi se existir subscribe
    //console.log('Destruiu');
  }

  loadProduct(){
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data =>{
      this.product = data; // pega infos do firestore
    })
  }

  async saveProduct(){
    await this.presentLoading();

    this.product.userId = this.authService.getAuth().currentUser.uid; // pega o id do user

    if(this.productId){
      // atualiza um produto caso existir
      try{
        await this.productService.updateProduct(this.productId, this.product); // pega infos do details.page.html
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home'); // volta para home caso add novo produto
      } catch(error){
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }

    } else {
      // cria um novo produto caso nao exista
      this.product.createAt = new Date().getTime(); // salva a data de quando foi criado o produto

      try{
        await this.productService.addProduct(this.product); // pega infos do details.page.html
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home'); // volta para home caso add novo produto
      } catch(error){
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }

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
