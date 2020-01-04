import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';         // importação do firebase para auth
import { AngularFirestoreModule } from '@angular/fire/firestore';   // importação do firestore para salvar produtos

// importa as dependencias que vão ser usadas, neste caso usamos o Firebase e FireStore
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [
    BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebase), // inicializa o projeto
     AngularFireAuthModule,
     AngularFirestoreModule
    ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Keyboard
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
