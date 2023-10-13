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
   public isLoading: boolean = false;
   public imageBanner: any = [];
   public imageBannerMobile: any = [];
   public metaImage: any = [];

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
         expertise: this.fb.array([]),
         metaImage:  new FormControl({ value: null, preview: null }, [Validators.required]),
         metaTitle:  new FormControl('', [Validators.required]),
         metaKeyword:  new FormControl('', [Validators.required]),
         metaDescription:  new FormControl('', [Validators.required]),
      });
   }

   get abouts(): FormArray {
      return this.form.get("about") as FormArray;
   }

   get expertise(): FormArray {
      return this.form.get("expertise") as FormArray;
   }

   // Call API get detail page fields to content
   getDetailPages() {
      this.pageService.getPageById(this.id).subscribe((data) => {
         this.form.controls["content"].setValue(data?.content?.content);
         this.form.controls["imageBanner"].setValue({ value: null, preview: data?.content?.imageBanner });
         this.form.controls["imageBannerMobile"].setValue({ value: null, preview: data?.content?.imageBannerMobile });
         this.form.controls['metaImage'].setValue({ value: null, preview: data.metaImage })
         this.form.controls['metaTitle'].setValue(data.metaTitle)
         this.form.controls['metaKeyword'].setValue(data.metaKeyword)
         this.form.controls['metaDescription'].setValue(data.metaDescription)
         this.metaImage = [{ value: null, preview: data.metaImage }]
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
         data?.content?.expertise?.forEach((item: { title: any; description: any }) => {
            this.expertise.push(
               this.fb.group({                 
                  title: item.title,
                  description: item.description,
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

   addLineExpertise() {
      this.expertise.push(
         this.fb.group({
            title: new FormControl("", [Validators.required]),
            description: new FormControl("", [Validators.required]),
         }),
      );
   }

   // Remove item in banner in home page
   removeLineExpertise(index: number) {
      this.expertise.removeAt(index);
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
      this.isLoading = true;
      console.log(this.form.value);
      const data = {
         content: {
            imageBanner: this.form.value.imageBanner,
            imageBannerMobile: this.form.value.imageBannerMobile,
            content: this.form.value.content,
            about: this.form.value.about,
            expertise: this.form.value.expertise,
         },
         metaImage: this.form.value.metaImage,
         metaDescription: this.form.value.metaDescription,
         metaKeyword: this.form.value.metaKeyword,
         metaTitle: this.form.value.metaTitle,
      };
      let formData = convertToFormDataV2(data, []);

      this.pageService.editorPage(formData, this.id).subscribe((data) => {
         console.log(data);
         this.isLoading = false;
      });
   }
}

