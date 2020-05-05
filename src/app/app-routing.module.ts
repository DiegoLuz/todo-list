import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';


const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'categoria', component: CategorieComponent},
  {path: 'lista', component: ListComponent},
  {path: 'item', component: ItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
