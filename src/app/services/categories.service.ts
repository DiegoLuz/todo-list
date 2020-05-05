import { Injectable } from "@angular/core";
import { Observable, throwError, Subject, } from "rxjs";
import { HttpClient, HttpHeaders,  } from "@angular/common/http";
import { catchError} from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  headers: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories[]>{
    const url = environment.backend + `categories`;
    return this.http.get<Categories[]>(url).pipe(catchError(this.handleError));
  }

  getCategorieID(id: number): Observable<Categories>{
    const url = environment.backend + `categories/${id}`;
    return this.http.get<Categories>(url).pipe(catchError(this.handleError));
  }

  postCategorie(categorie: Categories){
    const url = environment.backend + `categories`;
    return this.http.post<Categories>(url, categorie).pipe(catchError(this.handleError));
  }

  putCategorie(categorie: Categories){
    const url = environment.backend + `categories/${categorie.id}`;
    return this.http.put<Categories>(url, categorie).pipe(catchError(this.handleError));
  }

  deleteCategorie(id: number){
    const url = environment.backend + `categories/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    console.error("An error occurred", error);
    return throwError(error);
  }
}
