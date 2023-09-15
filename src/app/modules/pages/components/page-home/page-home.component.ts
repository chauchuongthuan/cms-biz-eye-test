import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PageService } from "../../services/page.service";
import { convertToFormDataV2 } from "src/app/shared/helper";
import { ActivatedRoute } from "@angular/router";

@Component({
   selector: "app-page-home",
   templateUrl: "./page-home.component.html",
   styleUrls: ["./page-home.component.scss"],
})
export class PageHomeComponent implements OnInit {
   form: FormGroup;

   public bannerImageMobile: any = [];
   public bannerImage: any = [];
   public bannerClient: any = [];
   public submitted: boolean = false;
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
         heroBanner: this.fb.array([]),
         clients: this.fb.array([]),
      });
   }

   get lines(): FormArray {
      return this.form.get("heroBanner") as FormArray;
   }

   get clients(): FormArray {
      return this.form.get("clients") as FormArray;
   }

   // Call API get detail page fields to content
   getDetailPages() {
      this.pageService.getPageById(this.id).subscribe((data) => {
         console.log(data);
         // Push data in server hero banner
         data?.content?.heroBanner?.forEach((item: { bannerImage: any; bannerImageMobile: any; link: any; video: any }) => {
            if (item.bannerImage === "") {
               item.bannerImage = null;
            }
            if (item.bannerImageMobile === "") {
               item.bannerImageMobile = null;
            }
            this.lines.push(
               this.fb.group({
                  bannerImage: [{ value: null, preview: item.bannerImage }],
                  bannerImageMobile: [{ value: null, preview: item.bannerImageMobile }],
                  link: item.link,
                  video: item.video,
               }),
            );
            this.bannerImage.push(item.bannerImage);
            this.bannerImageMobile.push(item.bannerImageMobile);
         });
         // Push data in server our clients
         data?.content?.clients?.forEach((item: { bannerImage: any; link: any; order: any }) => {
            this.clients.push(
               this.fb.group({
                  bannerImage: [{ value: null, preview: item.bannerImage }],
                  link: item.link,
                  order: item.order,
               }),
            );
         });
      });
   }

   // Add item in our clients in home page
   addClient() {
      this.clients.push(
         this.fb.group({
            bannerImage: new FormControl({ value: null, preview: null }, [Validators.required]),
            link: "",
            order: "",
         }),
      );
   }

   // Remove item in our clients in home page
   removeClient(index: number) {
      this.clients.removeAt(index);
   }

   // Add item in banner in home page
   addLine() {
      this.lines.push(
         this.fb.group({
            bannerImage: new FormControl({ value: null, preview: null }, [Validators.required]),
            bannerImageMobile: new FormControl({ value: null, preview: null }, [Validators.required]),
            link: "",
            video: "",
         }),
      );
   }

   // Remove item in banner in home page
   removeLine(index: number) {
      this.lines.removeAt(index);
   }

   changeFileUpload(data: any, index: number, field: string, types: string) {
      if (types === "lines") {
         this.lines.controls[index].get(field)?.setValue(data);
      } else {
         this.clients.controls[index].get(field)?.setValue(data);
      }
   }

   submit() {
      this.submitted = true;
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

