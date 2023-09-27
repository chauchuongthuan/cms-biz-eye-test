import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { convertToFormDataV2, strToSlug } from "src/app/shared/helper";
import { AwardService } from "../services/award.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthenticationService } from "src/app/common/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterService } from "src/app/common/services/router.service";

@Component({
   selector: "app-post-award",
   templateUrl: "./post-award.component.html",
   styleUrls: ["./post-award.component.scss"],
})
export class PostAwardComponent implements OnInit {
   public formAward!: UntypedFormGroup;
   submitted: boolean = false;
   isLoading: boolean = false;
   contentText: string = "";
   categories: any;
   award: any;
   expertise: any;
   isEdit: boolean = false;
   state: string = "Create";
   shortDescriptionEditor: string = "";
   challengeEditor: string = "";
   solutionEditor: string = "";
   public id: any;
   constructor(
      private fb: FormBuilder,
      private awardService: AwardService,
      private msg: NzMessageService,
      private auth: AuthenticationService,
      private router: Router,
      private routerService: RouterService,
      routes: ActivatedRoute,
   ) {
      const id = routes.snapshot.queryParamMap.get("id");
      this.id = id;
      if (id) {
         this.getPostAwardDetail();
      }
   }

   ngOnInit(): void {
      this.formAward = this.postAwardFormControl();
      this.getCategories();
      this.getAward();
      this.getExpertise();
   }

   postAwardFormControl() {
      return this.fb.group({
         client: new FormControl("", [Validators.required]),
         title: new FormControl("", [Validators.required]),
         shortDescription: new FormControl("", [Validators.required]),
         description: new FormControl("", [Validators.required]),
         challenge: new FormControl("", [Validators.required]),
         solution: new FormControl("", [Validators.required]),
         image: new FormControl({ value: "", preview: null }, []),
         detailImage: new FormControl({ value: "", preview: null }, []),
         thumbnailVideo: new FormControl({ value: "", preview: null }, []),
         shareOfVoice: this.fb.array([], [Validators.required]),
         // followers: new FormControl("", [Validators.required]),
         // engagementRate: new FormControl("", [Validators.required]),
         // impressions: new FormControl("", [Validators.required]),
         social: this.fb.array([], [Validators.required]),
         gallery: this.fb.array([], [Validators.required]),
         video: new FormControl("", [Validators.required]),
         slug: new FormControl("", [Validators.required]),
         award: new FormControl("", [Validators.required]),
         category: new FormControl("", [Validators.required]),
         expertise: new FormControl("", [Validators.required]),
         active: new FormControl(true, [Validators.required]),
         sortOrder: new FormControl("", []),
         metaTitle: new FormControl("", []),
         metaDescription: new FormControl("", []),
         metaKeyword: new FormControl("", []),
         metaImage: new FormControl({ value: "", preview: null }, []),
      });
   }

   getPostAwardDetail() {
      this.state = "Edit";
      this.awardService.getDetailPostAward(this.id).subscribe((data) => {
         data.gallery?.forEach((item: any, index: number) => {
            this.galleries?.push(
               this.fb.group({
                  value: "",
                  preview: item,
               }),
            );
         });
         data.social?.forEach((item: any, index: number) => {
            this.social?.push(
               this.fb.group({
                  value: "",
                  preview: item,
               }),
            );
         });
         data.shareOfVoice.forEach((item: any, index: number) => {
            const shareOfVoice = this.fb.group({
               name: item.name,
               number: item.number
             });
            this.shareOfVoice?.push(shareOfVoice)
         }) 
         this.formAward.patchValue({
            title: data.title,
            image: { value: "", preview: data.image },
            detailImage: { value: "", preview: data.detailImage },
            thumbnailVideo: { value: "", preview: data.thumbnailVideo },
            sortOrder: data.sortOrder,
            shortDescription: data.shortDescription,
            description: data.description,
            challenge: data.challenge,
            solution: data.solution,
            // shareOfVoice: data.shareOfVoice,
            // impressions: data.impressions,
            client: data.client,
            // engagementRate: data.engagementRate,
            video: data.video,
            award: data.awardImage[0]?.id || data.awardImage[0]?._id,
            category: data.category[0]?.id || data.category[0]?._id,
            expertise: data.expertise[0]?.id || data.expertise[0]?._id,
            // followers: data.followers,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            metaKeyword: data.metaKeyword,
            metaImage: { value: "", preview: data.metaImage },
         });
         //  setTimeout(() => {
         //     this.shortDescriptionEditor = data.shortDescription;
         //     this.challengeEditor = data.challenge;
         //     this.solutionEditor = data.solution;
         //  }, 350);
      });
   }

   changeFileUpload(data: any, field: string) {
      this.formAward.controls[field].setValue(data);
   }

   onChangeTitle(locale: string) {
      let slug = strToSlug(this.formAward.controls[`title`].value);
      this.formAward.controls[`slug`].setValue(slug);
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

   getExpertise() {
      this.awardService.getExpertiseAll().subscribe((data) => {
         this.expertise = data;
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

   get shareOfVoice(): FormArray {
      return this.formAward.get("shareOfVoice") as FormArray;
   }
   addLineShareOfVoice() {
      const shareOfVoice = this.fb.group({
         name: '',
         number: ''
       });
      this.shareOfVoice.push(shareOfVoice);
   }
   removeLineShareOfVoice(index: number) {
      this.shareOfVoice.removeAt(index);
   }
   onSave() {
      this.submitted = true;
      
      const data = this.formAward.value;
      let galleries: any[] = this.formAward.controls["gallery"].value;
      let socials: any[] = this.formAward.controls["social"].value;

      if (this.formAward.invalid) {
         Object.keys(this.formAward.controls).map((key) => {
            if (this.formAward.controls[key]?.status === "INVALID") {
               this.msg.create("error", "Please enter " + key);
            }
         });
         return;
      }
      for(let [index, item] of galleries.entries()){
        if(!item.value && !item.preview){
          this.msg.create("error", "Please enter gallery " + (index + 1));
          return;
        }
      }
      for(let [index, item] of socials.entries()){
        if(!item.value && !item.preview){
          this.msg.create("error", "Please enter social " + (index + 1));
          return;
        }
      }
      this.isLoading = true;
      let formData = convertToFormDataV2(data, ["metaImage", "image", "detailImage", "gallery", "social", "thumbnailVideo"]);
      if (this.id) {
         this.awardService.editPostAward(formData, this.id).subscribe((data) => {
           this.router.navigateByUrl("/admin/list-award");
           this.submitted = false;
           this.isLoading = false;
         }, error => {
          this.isLoading = false;
         });
      } else {
         this.awardService.createPostAward(formData).subscribe((data) => {
            this.router.navigateByUrl("/admin/list-award");
            this.submitted = false;
            this.isLoading = false;
         }, error => {
          this.isLoading = false;
         });
      }
   }
}
