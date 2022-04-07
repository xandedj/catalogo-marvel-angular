import { CharactersApiService } from "./character/shared/characters-api.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Md5 } from "ts-md5/dist/md5";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-characters",
  templateUrl: "./characters.component.html",
  styleUrls: ["./characters.component.css"],
})
export class CharactersComponent implements OnInit {
  constructor(private characterSvc: CharactersApiService) {}
  allCharacters: Observable<any>;

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.allCharacters = this.characterSvc.getAllCharacters();
  }
}
