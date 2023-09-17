import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { convertToFormDataV2, strToSlug } from "src/app/shared/helper";
import { AwardService } from "../services/award.service";

@Component({
  selector: "app-post-award",
  templateUrl: "./post-award.component.html",
  styleUrls: ["./post-award.component.scss"],
})
export class PostAwardComponent implements OnInit {
  public formAward!: UntypedFormGroup;
  submitted: boolean = false;
  contentText: string = "";
  categories: any;
  award: any;
  constructor(private fb: FormBuilder, private awardService: AwardService) { }

  ngOnInit(): void {
    this.formAward = this.postAwardFormControl();
    this.getCategories();
    this.getAward();
  }

  postAwardFormControl() {
    return this.fb.group({
      client: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      shortDescription: new FormControl("", [Validators.required]),
      challenge: new FormControl("", [Validators.required]),
      solution: new FormControl("", [Validators.required]),
      image: new FormControl({ value: "", preview: null }, []),
      detailImage: new FormControl({ value: "", preview: null }, []),
      shareOfVoice: new FormControl("", [Validators.required]),
      followers: new FormControl("", [Validators.required]),
      engagementRate: new FormControl("", [Validators.required]),
      impressions: new FormControl("", [Validators.required]),
      social: this.fb.array([]),
      gallery: this.fb.array([]),
      video: new FormControl("", [Validators.required]),
      slug: new FormControl("", [Validators.required]),
      award: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      active: new FormControl(true, [Validators.required]),
      sortOrder: new FormControl("", [Validators.required]),
      metaTitle: new FormControl("", []),
      metaDescription: new FormControl("", []),
      metaKeyword: new FormControl("", []),
      metaImage: new FormControl({ value: "", preview: null }, []),
    });
  }



  changeFileUpload(data: any, field: string) {
    this.formAward.controls[field].setValue(data);
  }

  onChangeTitle(locale: string) {
    if (this.formAward.controls[`title`].value) {
      let slug = strToSlug(this.formAward.controls[`title`].value);
      this.formAward.controls[`slug`].setValue(slug);
    }
  }

  onChangeEditor(data: any, field: string) {
    this.formAward.controls[field].setValue(data);
  }
  onChangeText(data: any) {
    this.contentText = data;
  }

  getCategories() {
    this.awardService.getCategoryAll().subscribe((data) => {
      this.categories = data;
    });
  }

  getAward() {
    this.awardService.getAwardAll().subscribe((data) => {
      this.award = data;
    });
  }

  get galleries(): FormArray {
    return this.formAward.get("gallery") as FormArray;
  }
  addLine() {
    this.galleries.push(new FormControl({ value: null, preview: null }, [Validators.required]));
  }
  removeLine(index: number) {
    this.galleries.removeAt(index);
  }

  changeFileUploadForm(data: any, index: number, type: boolean) {
    if (type) {
      this.galleries.controls[index]?.setValue(data);
    } else {
      this.social.controls[index]?.setValue(data);
    }
  }

  get social(): FormArray {
    return this.formAward.get("social") as FormArray;
  }
  addLineSocial() {
    this.social.push(new FormControl({ value: null, preview: null }, [Validators.required]));
  }
  removeLineSocial(index: number) {
    this.social.removeAt(index);
  }

  onSave() {
    const data = this.formAward.value;

   console.log("data submit::", data);
   let formData = convertToFormDataV2(data, ["metaImage", "image", "imageMb", "gallery"]);
    this.awardService.createPostAward(formData).subscribe(data => {
      console.log(data);
    })
  }
}

