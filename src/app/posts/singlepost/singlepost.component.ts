import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";

import SeoService from '../seo.service';
import { Post } from "../post.model";
import { PostsService } from "../posts.service";




@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css'],

})


export class SinglepostComponent implements OnInit {
  singlePost = {
    '_id': '',
    'title': '',
    'content': '',
    'imagePath': '',
    'status': 0
  };
  share = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService, private activeRoute: ActivatedRoute,  private _meta: Meta,
    private _title: Title,  private router : Router) {}
  ngOnInit() {

    this.metaTagService.addTags([
      { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Digamber Singh' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);


    this.activeRoute.params.subscribe(params => {
      if(params['Id']) {
          this.postsService.getSingle(params['Id'])
              .subscribe(res => {
                this.singlePost = res['data'][0];
                console.log(this.singlePost.title);
              });
      }
  })
  }

  shareOnSocialMedia(socialMedia){
    let url = "";
    let pageUrl = encodeURIComponent(document.URL);
    let newWindow = true;
    if(socialMedia=="Facebook"){
      url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
    }else if(socialMedia=="Twitter"){
      url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + "";
    }else if(socialMedia=="LinkedIn"){
      url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
    }else if(socialMedia=="Whatsapp"){
      url = "https://api.whatsapp.com/send?phone=&source=&data=&text=" + pageUrl;
    }else if(socialMedia=="Email"){
      url = "mailto:?subject=Order Homemade Food&body" + pageUrl;
    }else if(socialMedia=="Telegram"){
      url = "https://t.me/share/url?url=" + pageUrl + "&text=";
    }else if(socialMedia=="Skype"){
      url = "https://web.skype.com/share?url=" + pageUrl;
    }else if(socialMedia=="Pinterest"){
      url = "https://in.pinterest.com/pin/create/button/?description=&media&url=" + pageUrl;
    }else if(socialMedia=="Messenger"){
      url = "fb-messenger://share/?link= " + pageUrl;
      newWindow = false;
    }
    if(newWindow){
      let left = (screen.width - 570) / 2;
      let top = (screen.height - 570) / 2;
      let params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
      window.open(url,"NewWindow",params);
    }else{
      var mail = document.createElement("a");
      mail.href = url;
      mail.click();
    }

  }
  goToPage(url){
    this.router.navigateByUrl(url);
  }

  closeDetail(){
    this.router.navigateByUrl('/post/');
  }

  goToCheckoutPage(){
    this.router.navigateByUrl('/');
  }



}

