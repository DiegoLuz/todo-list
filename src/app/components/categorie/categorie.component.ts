import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/categories.model';
import { FormGroup, FormBuilder,Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  formCategoria: FormGroup;
  categorias: Categories[] = [];
  botaoAcao: string;
  submitted = false;

  constructor(private fb: FormBuilder, private categorieService: CategorieService, private route: ActivatedRoute,
    private router: Router) {

    this.criarForm();

   }

  ngOnInit(): void {
    this.botaoAcao = "Adicionar";
    this.listarCategorias();
  }


  criarForm(){
    this.formCategoria = this.fb.group({
      'id': "",
      'name': ['', Validators.required],
    })
  }

  get f() { return this.formCategoria.controls; }

  listarCategorias(){
    this.categorieService.getCategories()
      .subscribe(x => {
        this.categorias = x;
      });
  }

  adicionarCategoria(categoria: Categories){
    this.categorieService.postCategorie(categoria)
      .subscribe(x => {
        this.categorias.unshift(x);
        this.submitted = false;
        this.formCategoria.reset();
      })
  }

  submitForm(categoria: Categories){

    this.submitted = true;

    if (this.formCategoria.invalid) {
      return;
    }
    else{
      this.adicionarCategoria(categoria);
    }
  }

  atualizarCategoria(novoTitulo: string, categoria: Categories){
    categoria.name = novoTitulo;
    this.categorieService.putCategorie(categoria)
      .subscribe(x => {
        let categoriaAtual = this.categorias.find(x => x.id == categoria.id);
        if(categoriaAtual != undefined){
          this.categorias[this.categorias.indexOf(categoriaAtual)] = x;
        }
      })
  }

  removerCategoria(id: number){
    this.categorieService.deleteCategorie(id)
      .subscribe(x => {
        let categoriaAtual = this.categorias.find(x => x.id == id);
        if(categoriaAtual != undefined){
          this.categorias.splice(this.categorias.indexOf(categoriaAtual),1);
        }
      })
  }

  abrirCategoria(categoria: Categories){
    this.router.navigate(['/lista', { id: categoria.id }]);
  }

}
