import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { List } from 'src/app/models/list.model';
import { ListService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  form: FormGroup;
  listas: List[] = [];
  botaoAcao: string;
  submitted = false;
  idCategoria: number

  constructor(private fb: FormBuilder, private Listervice: ListService, private route: ActivatedRoute,
    private router: Router) {

    this.criarForm();

   }

  ngOnInit(): void {
    this.botaoAcao = "Adicionar";

    let id = null;
    this.route.queryParams.subscribe(parametros => {
      id = this.route.snapshot.params.id;

       if(id != null){
         this.idCategoria = id;
         this.listarListas(id);
       }
        
     });
  }


  criarForm(){
    this.form = this.fb.group({
      'id': "",
      'name': ['', Validators.required],
    })
  }

  get f() { return this.form.controls; }

  listarListas(idCategoria: number){
    this.Listervice.getCategoriesList(idCategoria)
      .subscribe(x => {
        this.listas = x;
      });
  }

  adicionarLista(lista: List){
    this.Listervice.postCategorieList(lista, this.idCategoria)
      .subscribe(x => {
        this.listas.unshift(x);
        this.submitted = false;
        this.form.reset();
      })
  }

  submitForm(lista: List){

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    else{
      this.adicionarLista(lista);
    }
  }

  atualizarLista(novoTitulo: string, lista: List){
    lista.name = novoTitulo;
    this.Listervice.putCategorieList(lista, this.idCategoria)
      .subscribe(x => {
        let listaAtual = this.listas.find(x => x.id == lista.id);
        if(listaAtual != undefined){
          this.listas[this.listas.indexOf(listaAtual)] = x;
        }
      })
  }

  removerLista(id: number){
    this.Listervice.deleteCategorieList(id, this.idCategoria)
      .subscribe(x => {
        let listaAtual = this.listas.find(x => x.id == id);
        if(listaAtual != undefined){
          this.listas.splice(this.listas.indexOf(listaAtual),1);
        }
      })
  }

  abrirItem(lista: List){
    this.router.navigate(['/item', { idCategorie: this.idCategoria, idList: lista.id }]);
  }

}
