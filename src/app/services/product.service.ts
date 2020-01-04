import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // CRUD dos produtos no firestore
  
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) { 
    this.productsCollection = this.afs.collection<Product>('Products');
  }

  // lista os produtos que estão na coleção
  getProducts(){
    return this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data}; // retorna infos do produto
        })
      })
    )
  }

  addProduct(product: Product){
    return this.productsCollection.add(product); // adiciona produto no firestore
  }

  getProduct(id: string){
    return this.productsCollection.doc<Product>(id).valueChanges(); // retorna infos do produto
  }

  updateProduct(id: string, product: Product){
    return this.productsCollection.doc<Product>(id).update(product); // atualiza infos do produto
    //return this.productsCollection.doc<Product>(id).set({price: '299.99'}); // atualiza campo especifico
  }

  deleteProduct(id: string){
    return this.productsCollection.doc<Product>(id).delete(); // tenta deletar o produto indicado
  }

}
