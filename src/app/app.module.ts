import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsService} from './shared/items.service';
import { environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
