import { Injectable } from "@angular/core";
import { Observable, throwError, Subject, } from "rxjs";
import { HttpClient, HttpHeaders,  } from "@angular/common/http";
import { catchError} from "rxjs/operators";
import { environment } from "../../environments/environment";
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  headers: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getCategoriesList(idCategorie: number): Observable<List[]>{
    const url = environment.backend + `categories/${idCategorie}/lists`;
    return this.http.get<List[]>(url).pipe(catchError(this.handleError));
  }

  getCategorieListID(idLista: number, idCategorie: number): Observable<List>{
    const url = environment.backend + `categories/${idCategorie}/lists/${idLista}`;
    return this.http.get<List>(url).pipe(catchError(this.handleError));
  }

  postCategorieList(lista: List, idCategorie: number){
    const url = environment.backend + `categories/${idCategorie}/lists`;
    return this.http.post<List>(url, lista).pipe(catchError(this.handleError));
  }

  putCategorieList(lista: List, idCategorie: number){
    const url = environment.backend + `categories/${idCategorie}/lists/${lista.id}`;
    return this.http.put<List>(url, lista).pipe(catchError(this.handleError));
  }

  deleteCategorieList(idLista: number, idCategorie: number){
    const url = environment.backend + `categories/${idCategorie}/lists/${idLista}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    console.error("An error occurred", error);
    return throwError(error);
  }
  

}
