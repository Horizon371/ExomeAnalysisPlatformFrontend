import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-filter-exomes-component',
  templateUrl: './filter-exomes-component.component.html',
  styleUrls: ['./filter-exomes-component.component.css']
})
export class FilterExomesComponentComponent {
  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  filterByName = true;
  filterByDate = true;
  checkbox: MatCheckbox = null;
  nameInput: string = null;

  @Output() nameFilterEvent = new EventEmitter<string>();

  constructor() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19))
    });
  }

  onNameCheckStatChange() {
    this.filterByName = !this.filterByName;
    if (this.filterByName) {
      this.nameInput = '';
      this.nameFilterEvent.emit('');
    }
  }

  onDateCheckStatChange() {
    this.filterByDate = !this.filterByDate;
  }

  onFilterApply() {
    this.nameFilterEvent.emit(this.nameInput);
  }
}
