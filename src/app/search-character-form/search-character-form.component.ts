import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, tap, startWith} from 'rxjs/operators';
@Component({
  selector: "app-search-character-form",
  templateUrl: "./search-character-form.component.html",
  styleUrls: ["./search-character-form.component.css"],
})
export class SearchCharacterFormComponent implements OnInit {

  @Output() change = new EventEmitter();
  @Input() set data(allCharacters: any[]) {
    if(allCharacters.length > 0) {
      this.allCharacters = allCharacters;
      this.filterNames();
    }
  };
  
  search = new FormControl();
  filteredNames: Observable<string[]>;
  allCharacters: any[] = [];
  names: string[] = [];

  constructor() {}

  async ngOnInit() {

    this.filteredNames = this.search.valueChanges.pipe(
      startWith(''), 
      tap(async(value) => {
        if(value.length >= 3) { this.change.emit(value); }
      }), 
      map(value => this._filter(value)),
    );
  }

  private filterNames() {
    this.allCharacters.map((character) => { this.names.push(character.name); }); 
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.names.filter(option => option.toLowerCase().includes(filterValue));
  }

}
