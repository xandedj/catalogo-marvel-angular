import { CharactersApiService } from "./character/shared/characters-api.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-characters",
  templateUrl: "./characters.component.html",
  styleUrls: ["./characters.component.css"],
})
export class CharactersComponent implements OnInit {
  constructor(private characterSvc: CharactersApiService) {}
  listSearch: any[] = []
  allCharacters: Observable<any>;

  async ngOnInit() {
    await this.getCharacters();
  }

  async getCharacters() {
    this.allCharacters = await this.characterSvc.getAllCharacters();
    this.listSearch = await this.allCharacters.toPromise()    
  }

  async changeSearth(search: string) {
    this.allCharacters = await this.characterSvc.getCharacters(search);
    this.listSearch = await this.allCharacters.toPromise()  
  }
}
