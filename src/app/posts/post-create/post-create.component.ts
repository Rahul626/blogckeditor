import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';


@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private postId: string;


  CKEDITOR = {
    extraPlugins: 'image2,uploadimage,embed,autoembed,image2',

    toolbar: [{
        name: 'clipboard',
        items: ['Undo', 'Redo']
      },
      {
        name: 'styles',
        items: ['Styles', 'Format']
      },
      {
        name: 'basicstyles',
        items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
      },
      {
        name: 'paragraph',
        items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
      },
      {
        name: 'links',
        items: ['Link', 'Unlink']
      },
      {
        name: 'insert',
        items: ['Image', 'Table']
      },
      {
        name: 'tools',
        items: ['Maximize']
      },
      {
        name: 'editing',
        items: ['Scayt']
      },
      {
        name : 'media',
        items : 'mediaEmbed'
      },
      {
         // Adding drag and drop image upload.
         extraPlugins: 'print,format,font,colorbutton,justify,uploadimage ,embed,autoembed,image2, embed,autoembed,image2',
         uploadUrl: 'http://localhost:3000/api/posts/images/',
       removeDialogTabs : 'image:Upload',

         // Configure your file manager integration. This example uses CKFinder 3 for PHP.
         filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
         filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
         filebrowserUploadUrl: 'http://localhost:3000/api/posts/upload',
         filebrowserImageUploadUrl: 'http://localhost:3000/api/posts/upload',
      }
        ],
        plugins: [MediaEmbed],
        embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',

        http:'//localhost:3000/file/images/1579781319880_chicken.jpg',

    // Configure your file manager integration. This example uses CKFinder 3 for PHP.
    filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
    filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
    filebrowserUploadUrl: 'http://localhost:3000/api/posts/upload',
    filebrowserImageUploadUrl: 'http://localhost:3000/api/posts/upload',

    // Upload dropped or pasted images to the CKFinder connector (note that the response type is set to JSON).
    uploadUrl: 'http://localhost:3000/api/posts/images/',

    // Reduce the list of block elements listed in the Format drop-down to the most commonly used.
    format_tags: 'p;h1;h2;h3;pre',
    // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
    removeDialogTabs: 'image:advanced;link:advanced',

    height: 450,
  }
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    console.log(this.form)
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
