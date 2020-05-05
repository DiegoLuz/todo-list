import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieService } from './services/categories.service';
import { ListService } from './services/lists.service';
import { ItemService } from './services/items.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    CategorieService,
    ListService, 
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
