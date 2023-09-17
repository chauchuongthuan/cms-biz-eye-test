import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-award',
  templateUrl: './filter-award.component.html',
  styleUrls: ['./filter-award.component.scss']
})
export class FilterAwardComponent implements OnInit {

  @Output() onFilter = new EventEmitter<any>();
  @Output() onExport = new EventEmitter<any>();
  public filterForm!: UntypedFormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.filterFormControl();
  }

  filterFormControl() {
    return this.fb.group({
      uid: new FormControl("", []),
      title: new FormControl("", []),
      active: new FormControl("", []),
      createdFrom: new FormControl("", []),
      createdTo: new FormControl("", []),
    });
  }

  onApply() {
    let params = {} as any;
    let keys = Object.keys(this.filterForm.value);
    let values = Object.values(this.filterForm.value);
    keys.forEach((key, index) => {
      if (["number", "boolean", "string"].includes(typeof values[index])) {
        params[key] = values[index];
      } else if (values[index] && ["createdFrom", "createdTo"].includes(key)) {
        let temp = values[index] as any;
        params[key] = temp.toISOString();
      }
    });
    this.onFilter.emit(params);
  }

  onRefresh() {
    this.filterForm.reset();
    this.onFilter.emit(this.filterForm.value);
  }

}
