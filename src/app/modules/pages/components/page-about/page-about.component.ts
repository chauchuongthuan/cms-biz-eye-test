import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PageService } from "../../services/page.service";
import { convertToFormDataV2 } from "src/app/shared/helper";

@Component({
   selector: "app-page-about",
   templateUrl: "./page-about.component.html",
   styleUrls: ["./page-about.component.scss"],
})
export class PageAboutComponent implements OnInit {
   public id: any;
   public form: FormGroup;
   public submitted: boolean = false;
   public imageBanner: any = [];
   public imageBannerMobile: any = [];
   constructor(
      private fb: FormBuilder,
      private pageService: PageService,
      private router: ActivatedRoute,
   ) {
      const id = router.snapshot.queryParamMap.get("id");
      this.id = id;
      this.getDetailPages();
   }

   ngOnInit(): void {
      this.form = this.fb.group({
         imageBanner: new FormControl({ value: null, preview: null }, [Validators.required]),
         imageBannerMobile: new FormControl({ value: null, preview: null }),
         content: new FormControl("", [Validators.required]),
         about: this.fb.array([]),
      });
   }

   get abouts(): FormArray {
      return this.form.get("about") as FormArray;
   }

   // Call API get detail page fields to content
   getDetailPages() {
      this.pageService.getPageById(this.id).subscribe((data) => {
         this.form.controls["content"].setValue(data?.content?.content);
         this.form.controls["imageBanner"].setValue({ value: null, preview: data?.content?.imageBanner });
         this.form.controls["imageBannerMobile"].setValue({ value: null, preview: data?.content?.imageBannerMobile });
         data?.content?.about?.forEach((item: { bannerImage: any; bannerImageMobile: any; name: any; role: any }) => {
            this.abouts.push(
               this.fb.group({
                  bannerImage: [{ value: null, preview: item.bannerImage }],
                  bannerImageMobile: [{ value: null, preview: item.bannerImageMobile }],
                  name: item.name,
                  role: item.role,
               }),
            );
         });
      });
   }

   // Add item
   addLine() {
      this.abouts.push(
         this.fb.group({
            bannerImage: new FormControl({ value: null, preview: null }, [Validators.required]),
            bannerImageMobile: new FormControl({ value: null, preview: null }, [Validators.required]),
            name: new FormControl("", [Validators.required]),
            role: new FormControl("", [Validators.required]),
         }),
      );
   }

   // Remove item in banner in home page
   removeLine(index: number) {
      this.abouts.removeAt(index);
   }

   changeFileUpload(data: any, field: string) {
      this.form.controls[field].setValue(data);
   }

   changeFileUploadForm(data: any, index: number, field: string) {
      this.abouts.controls[index].get(field)?.setValue(data);
   }

   onChangeEditor(data: any) {
      this.form.controls["content"].setValue(data);
      // this.dataEditor = data;
   }

   submit() {
      this.submitted = true;

      console.log(this.form.value);

      if (this.form.invalid) {
         return;
      }
      console.log(this.form.value);
      const data = {
         content: this.form.value,
      };
      let formData = convertToFormDataV2(data, []);

      this.pageService.editorPage(formData, this.id).subscribe((data) => {
         console.log(data);
      });
   }
}

