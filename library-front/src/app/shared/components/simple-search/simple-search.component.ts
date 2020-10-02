import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.css']
})
export class SimpleSearchComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<any>();
  @Input() pageSize = 10;
  @Input() currentPage = 0;
  @ViewChild('searchInput', {static: true}) searchInputRef;

  constructor() { }

  ngOnInit() {
    this.debounceSetup();
  }

  debounceSetup() {
    fromEvent(this.searchInputRef.nativeElement, 'keyup')
      .pipe(
        map((evt: any) => evt.target.value),
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe((text: string) => this.emitSearch(text));
  }

  emitSearch(text: string) {
    this.searchEvent.emit(text);
  }
}
