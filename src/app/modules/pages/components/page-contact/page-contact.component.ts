import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PageService } from "../../services/page.service";
import { convertToFormDataV2 } from "src/app/shared/helper";
import { ActivatedRoute } from "@angular/router";

@Component({
   selector: "app-page-contact",
   templateUrl: "./page-contact.component.html",
   styleUrls: ["./page-contact.component.scss"],
})
export class PageContactComponent implements OnInit {
   form: FormGroup;

   public bannerImageMobile: any = [];
   public bannerImage: any = [];
   public metaImage: any = [];
   public bannerClient: any = [];
   public submitted: boolean = false;
   public dataType: string = "images";
   public id: any = "";
   constructor(
      private fb: FormBuilder,
      private pageService: PageService,
      private router: ActivatedRoute,
   ) {
      const id = router.snapshot.queryParamMap.get("id");
      this.id = id;
      this.getDetailPages();
   }

   ngOnInit() {
      this.form = this.fb.group({
         // heroBanner: this.fb.array([]),
         clients: this.fb.array([]),
         metaImage:  new FormControl({ value: null, preview: null }, [Validators.required]),
         metaTitle:  new FormControl('', [Validators.required]),
         metaKeyword:  new FormControl('', [Validators.required]),
         metaDescription:  new FormControl('', [Validators.required]),
      });
   }

   // get lines(): FormArray {
   //    return this.form.get("heroBanner") as FormArray;
   // }

   get clients(): FormArray {
      return this.form.get("clients") as FormArray;
   }

   // Call API get detail page fields to content
   getDetailPages() {
      this.pageService.getPageById(this.id).subscribe((data) => {
         console.log(data);
         // Push data in server hero banner
         this.form.controls['metaImage'].setValue({ value: null, preview: data.metaImage })
         this.form.controls['metaTitle'].setValue(data.metaTitle)
         this.form.controls['metaKeyword'].setValue(data.metaKeyword)
         this.form.controls['metaDescription'].setValue(data.metaDescription)
         this.metaImage = [{ value: null, preview: data.metaImage }]

         data?.content?.clients?.forEach((item: { title: any; link: any; address: any }) => {
            this.clients.push(
               this.fb.group({
                  link: item.link,
                  title: item.title,
                  address: item.address,
               }),
            );
         });
         
      });
   }

   // Add item in our clients in home page
   addClient() {
      this.clients.push(
         this.fb.group({
            link: "",
            address: "",
            title: "",
         }),
      );
   }

   // Remove item in our clients in home page
   removeClient(index: number) {
      this.clients.removeAt(index);
   }

   // // Add item in banner in home page
   // addLine() {
   //    this.lines.push(
   //       this.fb.group({
   //          bannerImage: new FormControl({ value: null, preview: null }, [Validators.required]),
   //          bannerImageMobile: new FormControl({ value: null, preview: null }, [Validators.required]),
   //          link: "",
   //          video: "",
   //          type: "",
   //       }),
   //    );
   // }

   // // Remove item in banner in home page
   // removeLine(index: number) {
   //    this.lines.removeAt(index);
   // }

   changeFileUpload(data: any, index: number, field: string, types: string) {
      if(types==='form'){
         this.form.controls[field].setValue(data)
      }
   }

   submit() {
      this.submitted = true;
      if (this.form.invalid) {
         return;
      }
      console.log(this.form.value);
      const data = {
         content: {
            clients: this.form.value.clients,
         },
         metaImage: this.form.value.metaImage,
         metaDescription: this.form.value.metaDescription,
         metaKeyword: this.form.value.metaKeyword,
         metaTitle: this.form.value.metaTitle,
      };
      let formData = convertToFormDataV2(data, []);

      this.pageService.editorPage(formData, this.id).subscribe((data) => {
         console.log(data);
      });
   }
}

