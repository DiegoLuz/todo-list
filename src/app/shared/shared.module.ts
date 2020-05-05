import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './components/item-list/item-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DECLARATIONS = [
    ItemListComponent
  ];


@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class SharedModule {}
