import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/Items.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { List } from 'src/app/models/list.model';
import { ItemService } from 'src/app/services/items.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  form: FormGroup;
  itens: Item[] = [];
  itensDone: Item[] = [];
  botaoAcao: string;
  submitted = false;
  idCategoria: number;
  idList: number;

  constructor(private fb: FormBuilder, private itemService: ItemService, private route: ActivatedRoute,
    private router: Router) {

    this.criarForm();

   }

  ngOnInit(): void {
    this.botaoAcao = "Adicionar";

    let idCategoria = null;
    let idList = null;
    this.route.queryParams.subscribe(parametros => {
      idCategoria = this.route.snapshot.params.idCategorie;
      idList = this.route.snapshot.params.idList;

       if(idCategoria != null){
         this.idCategoria = idCategoria;
         this.idList = idList;
         this.listarListas(idCategoria, idList);
       }
        
     });
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        this.atualizaItemParaDoneOuToDo(event.previousIndex);
    }
  }
  dropDone(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        this.atualizaItemParaDoneOuToDo(event.previousIndex);
    }
  }

  atualizaItemParaDoneOuToDo(previousIndex: number){
    let ItemAtual = this.itensDone[previousIndex];
    
    if(ItemAtual != undefined){
      ItemAtual.done = !ItemAtual.done;
      this.atualizarStatusItem(ItemAtual);
    }
  }

  criarForm(){
    this.form = this.fb.group({
      'id': "",
      'name': ['', Validators.required],
      'done': false
      
    })
  }

  get f() { return this.form.controls; }

  listarListas(idCategoria: number, idList: number){
    this.itemService.getCategoriesListItem(idCategoria, idList)
      .subscribe(x => {
        this.itens = x.filter(x => x.done == false);
        this.itensDone = x.filter(x => x.done == true);
      });
  }

  adicionarLista(item: Item){
    this.itemService.postCategorieListItem(item, this.idCategoria, this.idList)
      .subscribe(x => {
        this.itens.unshift(x);
        this.submitted = false;
        this.form.reset();
      })
  }

  submitForm(item: Item){

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    else{
      this.adicionarLista(item);
    }
  }

  atualizarStatusItem(item: Item){
    this.itemService.putCategorieListItem(item, this.idCategoria, this.idList, item.id)
    .subscribe(x => {

    });

  }

  atualizarItem(novoTitulo: string, item: Item){
    item.name = novoTitulo;
    this.itemService.putCategorieListItem(item, this.idCategoria, this.idList, item.id)
      .subscribe(x => {
        let listaAtual = this.itens.find(x => x.id == item.id);
        if(listaAtual != undefined){
          this.itens[this.itens.indexOf(listaAtual)] = x;
        }
      })
  }

  removerItem(id: number){
    this.itemService.deleteCategorieListItem(this.idCategoria, this.idList, id)
      .subscribe(x => {
        let listaAtual = this.itens.find(x => x.id == id);

        if(listaAtual != undefined){
          this.itens.splice(this.itens.indexOf(listaAtual),1);
        }

        let listaAtualDone = this.itensDone.find(x => x.id == id);
        if(listaAtualDone != undefined){
          this.itensDone.splice(this.itensDone.indexOf(listaAtualDone),1);
        }

      })
  }

}

