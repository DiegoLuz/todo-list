import { Injectable } from "@angular/core";
import { Observable, throwError, Subject, } from "rxjs";
import { HttpClient, HttpHeaders,  } from "@angular/common/http";
import { catchError} from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Item } from '../models/Items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  headers: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getCategoriesListItem(idCategorie: number, idList: number): Observable<Item[]>{
    const url = environment.backend + `categories/${idCategorie}/lists/${idList}/items`;
    return this.http.get<Item[]>(url).pipe(catchError(this.handleError));
  }

  getCategorieListItemID(idCategorie: number, idList: number, idItem: number ): Observable<Item>{
    const url = environment.backend + `categories/${idCategorie}/lists/${idList}/items/${idItem}`;
    return this.http.get<Item>(url).pipe(catchError(this.handleError));
  }

  postCategorieListItem(lista: Item, idCategorie: number, idList: number){
    const url = environment.backend + `categories/${idCategorie}/lists/${idList}/items`;
    return this.http.post<Item>(url, lista).pipe(catchError(this.handleError));
  }

  putCategorieListItem(lista: Item, idCategorie: number, idList: number, idItem: number){
    const url = environment.backend + `categories/${idCategorie}/lists/${idList}/items/${idItem}`;
    return this.http.put<Item>(url, lista).pipe(catchError(this.handleError));
  }

  deleteCategorieListItem(idCategorie: number, idList: number, idItem: number){
    const url = environment.backend + `categories/${idCategorie}/lists/${idList}/items/${idItem}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    console.error("An error occurred", error);
    return throwError(error);
  }
  

}
