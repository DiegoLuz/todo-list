import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategorieComponent } from './categorie/categorie.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { ItemComponent } from './item/item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const DECLARATIONS = [
    CategorieComponent,
    TodoListComponent,
    ItemComponent,
    ListComponent
  ];


@NgModule({
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DragDropModule
  ],
  providers: [],
})
export class ComponentsModule {}
