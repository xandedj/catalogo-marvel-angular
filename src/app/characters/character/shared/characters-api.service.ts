import { environment } from "./../../../../environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Md5 } from "ts-md5/dist/md5";

@Injectable({
  providedIn: "root",
})
export class CharactersApiService {
  /*Esses dados a Marvel vai nos fornecer é importante */
  time = Number(new Date());
  md5 = new Md5();
  HASH = Md5.hashStr(
    this.time + environment.publicKey + environment.privateKey
  );

  URL_API = `${environment.baseUrl}/characters?`;

  constructor(private http: HttpClient) {}

  getAllCharacters(): Observable<any> {
    return this.http
      .get<any>(`${this.URL_API}orderBy=name&apikey=${environment.publicKey}`)
      .pipe(map((data: any) => data.data.results));
  }

  getCharacters(character: string): Observable<any> {
    return this.http
      .get<any>(`${this.URL_API}nameStartsWith=${character}&limit=20&apikey=${environment.publicKey}`)
      .pipe(map((data: any) => data.data.results));
  }
}
