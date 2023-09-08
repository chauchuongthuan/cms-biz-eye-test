import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  
  form: FormGroup;
  public bannerImageMobile = [];
  public bannerImage = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      heroBanner: this.fb.array([])
    });
  }

  get lines(): FormArray {
    return this.form.get('heroBanner') as FormArray;
  }

  addLine() {
    this.lines.push(this.fb.group({
      bannerImage: '',
      bannerImageMobile: '',
      link: '',
      video: '',
      children: this.fb.array([])
    }));
  }

  removeLine(index: number) {
    this.lines.removeAt(index);
  }

  changeFileUpload(data: any, index: number, field: string) {
    this.lines.controls[index].get(field)?.setValue(data);
  }

  submit() {
    console.log(this.form.value);
  }

}
