import { Component, OnInit } from '@angular/core';
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  posts: Post[] = [];


  showPosts = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {

    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {

        this.posts = posts;
        this.showPosts = true;
        console.log('psts ::', this.posts, typeof posts);
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
  onPause(postId: string) {
    this.postsService.pausePost(postId);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}
