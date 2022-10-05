import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './modules/components/components.module';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory, MissingTranslationService } from './helpers/translation.helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslationService
      },
      defaultLanguage: 'en',
    }),
    AngularFireStorageModule,
    // TODO: Secure it.
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCzU6G0jx3iOM6VdO9pUEzbr1FztjZfgrQ',
      authDomain: 'listography-690a0.firebaseapp.com',
      databaseURL:
        'https://listography-690a0-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'listography-690a0',
      storageBucket: 'listography-690a0.appspot.com',
      messagingSenderId: '964387488071',
      appId: '1:964387488071:web:3d3c5189100cd089868c62',
    }),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
